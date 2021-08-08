import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  ListGroup,
  Button,
  Modal,
  Alert,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner";
import { useTranslation } from 'react-i18next';

export default function UserAdmin({ users }) {
  const [tempUsers, setTempUsers] = useState();
  const [originalUsers, setOriginalUsers] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [showModal, setModal] = useState(false);
  const [updatedPost, setUpdaedPost] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const { t, i18n } = useTranslation();

  const fetchUsers = async () => {
    try {
      const response = await fetch("/user");
      if (!response.ok) {
        throw Error("FAILED");
      }
      const data = await response.json();
      setTempUsers(data);
      setOriginalUsers(data);
    } catch (err) {
      console.log("Error while fetch users for analysis:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const searchUser = async () => {
    const originalUser = tempUsers;
    try {
      const keyword = document.getElementById("admin-user-searchInput").value;
      const response = await fetch(`/admin/user?keyword=${keyword}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      if (data) {
        setTempUsers([data]);
        return;
      }
      setErrorMsg("No result");
      setTempUsers([...originalUser]);
    } catch (err) {
      console.log("Error while searching user:", err);
      setTempUsers([...originalUser]);
      setErrorMsg("No result");
    }
  };

  const handleClose = () => {
    setModal(false);
    setSelectedUser();
    setUpdaedPost();
  };

  const setUserRole = async (role) => {
    try {
      const response = await fetch(
        `/admin/user?userId=${selectedUser._id}&role=${role}`,
        { method: "PUT" }
      );
      if (!response.ok) {
        throw Error("failed to update role");
      }
      const data = await response.json();
      setSelectedUser(data);
      fetchUsers();
    } catch (err) {
      console.log("Error while setting user role:", err);
    }
  };

  const deletUser = async () => {
    try {
      const response = await fetch(`/admin/user?userId=${selectedUser._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw Error("failed to delete user");
      }
      await response.json();
      fetchUsers();
      setModal(false);
    } catch (err) {
      console.log("Error while deleting user:", err);
    }
  };

  const cancel = () => {
    setTempUsers([...originalUsers]);
  };

  useEffect(() => {
    setTempUsers(users);
  }, [users]);

  return (
    <>
      <input
        id="admin-user-searchInput"
        className="admin-searchbox"
        name="post"
        placeholder={t("Search by user ID or username")}
      />
      <Button className="admin-searchBtn" onClick={searchUser}>
        {t('Search')}
      </Button>
      <Button variant="info" className="admin-searchBtn" onClick={cancel}>
        {t("Cancel")}
      </Button>
      {/* CITATION: https://react-bootstrap.github.io/components/list-group/ */}
      {errorMsg ? (
        <Alert
          className="admin-alert"
          variant="danger"
          dismissible
          onClose={() => setErrorMsg()}>
          <Alert.Heading>{t("Oops!")}</Alert.Heading>
          <p>{t(errorMsg)}</p>
        </Alert>
      ) : null}
      <ListGroup as="ul" className="admin-list">
        {tempUsers ? (
          tempUsers.map((user) => (
            <ListGroup.Item
              action
              key={user._id}
              as="li"
              onClick={() => {
                setModal(true);
                setSelectedUser(user);
              }}>
              {t("Username")}: {user.firstName} {user.lastName}, {t("Email")}: {user.email}
            </ListGroup.Item>
          ))
        ) : (
          <LoadingSpinner />
        )}
      </ListGroup>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Admin actions')}</Modal.Title>
        </Modal.Header>
        <Modal.Body id="admin-user-modalbody">
          <DropdownButton title={t("Change user's role")}>
            <Dropdown.Item
              active={selectedUser?.admin}
              onClick={() => {
                setUserRole(true);
              }}>
              {t('Admin')}
            </Dropdown.Item>
            <Dropdown.Item
              active={!selectedUser?.admin}
              onClick={() => {
                setUserRole(false);
              }}>
              {t('User')}
            </Dropdown.Item>
          </DropdownButton>
          <Button variant="danger" onClick={deletUser}>
            {t('Delete User')}
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
UserAdmin.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    })
  ),
};
