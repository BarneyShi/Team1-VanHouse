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

export default function UserAdmin({ users }) {
  const [tempUsers, setTempUsers] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [showModal, setModal] = useState(false);
  const [updatedPost, setUpdaedPost] = useState();

  const fetchUsers = async () => {
    try {
      const response = await fetch("/user");
      if (!response.ok) {
        throw Error("FAILED");
      }
      const data = await response.json();
      setTempUsers(data);
    } catch (err) {
      console.log("Error while fetch users for analysis:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  useEffect(() => {
    setTempUsers(users);
  }, [users]);

  return (
    <>
      <input
        className="admin-searchbox"
        name="post"
        placeholder="Search by user ID or username"
      />
      <Button className="admin-post-searchBtn">Search</Button>
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
              Username: {user.firstName} {user.lastName}, Email: {user.email}
            </ListGroup.Item>
          ))
        ) : (
          <LoadingSpinner />
        )}
      </ListGroup>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin actions</Modal.Title>
        </Modal.Header>
        <Modal.Body id="admin-user-modalbody">
          <DropdownButton title="Change user's role">
            <Dropdown.Item
              active={selectedUser?.admin}
              onClick={() => {
                setUserRole(true);
              }}>
              Admin
            </Dropdown.Item>
            <Dropdown.Item
              active={!selectedUser?.admin}
              onClick={() => {
                setUserRole(false);
              }}>
              User
            </Dropdown.Item>
          </DropdownButton>
          <Button variant="danger" onClick={deletUser}>
            Delete User
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
