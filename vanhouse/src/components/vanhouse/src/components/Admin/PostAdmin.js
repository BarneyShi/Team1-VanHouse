import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ListGroup, Button, Modal, Alert } from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner";
import EditPost from "../PostDetail/EditPost";

export default function PostAdmin({ posts }) {
  const [adminPosts, setAdminPosts] = useState();
  const [showModal, setModal] = useState(false);
  const [showEdit, setEdit] = useState(false);
  const [selectedPost, setSelectedPost] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [updatedPost, setUpdaedPost] = useState();
  const handleClose = () => {
    setModal(false);
    setSelectedPost();
    setUpdaedPost();
  };
  const fetchPost = async (id) => {
    try {
      const response = await fetch(`/post/${id}`);
      if (!response.ok) {
        throw Error(`failed to fetch ${id}`);
      }
      const data = await response.json();
      setSelectedPost(data.postInfo);
    } catch (err) {
      console.log("Error while fetch post:", err);
    }
  };

  const searchPost = async () => {
    try {
      setAdminPosts();
      const postId = document.getElementById("admin-searcbox-post").value;
      const response = await fetch(`/post/${postId}`);
      if (!response.ok) {
        throw Error(`failed to find ${postId}`);
      }
      const data = await response.json();
      setAdminPosts([data.postInfo]);
    } catch (err) {
      console.log("Error while searching post:", err);
      setErrorMsg("No result");
    }
  };

  const refreshPosts = async () => {
    try {
      const response = await fetch("/posts");
      if (!response.ok) {
        throw Error("FAILED");
      }
      const data = await response.json();
      setAdminPosts(data);
    } catch (err) {
      console.log("Error while fetch posts for analysis:", err);
    }
  };
  const deletePost = async () => {
    try {
      const response = await fetch(`/post/${selectedPost._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw Error("failed to delete");
      }
      await response.json();
      setModal(false);
      refreshPosts();
    } catch (err) {
      console.log("Error while deleting post:", err);
    }
  };

  useEffect(() => {
    setAdminPosts(posts);
  }, [posts]);

  useEffect(async () => {
    refreshPosts();
  }, [updatedPost]);

  return (
    <>
      <input
        id="admin-searcbox-post"
        className="admin-searchbox"
        name="post"
        placeholder="Search by post ID"
      />
      <Button onClick={searchPost} className="admin-post-searchBtn">
        Search
      </Button>
      {/* CITATION: https://react-bootstrap.github.io/components/list-group/ */}
      {errorMsg ? (
        <Alert className="admin-alert" variant="danger" dismissible>
          <Alert.Heading>Oops!</Alert.Heading>
          <p>{errorMsg}</p>
        </Alert>
      ) : null}
      <ListGroup as="ul" className="admin-list">
        {adminPosts ? (
          adminPosts.map((post) => (
            <ListGroup.Item
              action
              active={selectedPost?._id === post._id}
              key={post._id}
              as="li"
              onClick={() => {
                fetchPost(post._id);
                setModal(true);
                setSelectedPost(post);
              }}>
              Title: {post.title}, Address: {post.address}, Price: {post.price}
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
        <Modal.Body>
          <Button onClick={() => setEdit(true)}>Edit</Button>
          <Button onClick={deletePost} variant="danger">
            Delete
          </Button>
        </Modal.Body>
      </Modal>

      <EditPost
        show={showEdit}
        setDisplay={setEdit}
        post={selectedPost}
        setPost={setSelectedPost}
        setUpdaedPost={setUpdaedPost}
      />
    </>
  );
}
PostAdmin.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      address: PropTypes.string,
      postalCode: PropTypes.string,
      price: PropTypes.number,
      paymentPeriod: PropTypes.string,
      bedrooms: PropTypes.string,
      bathrooms: PropTypes.string,
      sqft: PropTypes.string,
      leaseLength: PropTypes.string,
      pets: PropTypes.bool,
      utilities: PropTypes.bool,
      laundry: PropTypes.bool,
      furnished: PropTypes.bool,
      images: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
