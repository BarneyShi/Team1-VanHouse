// CITATION: Font awesome button reference: https://www.w3schools.com/howto/howto_css_icon_buttons.asp
// TODO - hide create-post-button when not logged in

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Post from "./Post";
import NewPost from "./NewPost";
import SearchBar from "./SearchBar";
import "../styles/Post.css";
import Schedule from "./Schedule";

function PostCollection() {
  // Note: Temporarily adding in placeholder post JSON objects
  // The objects currently only contain info used in the main page post display, not the detail view.
  const [posts, setPosts] = useState([
    {
      id: 0,
      dateCreated: "01-06-2021",
      postTitle: "Untitled Post",
      price: 1000,
      imageURLs: [
        "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ikblearningcentre.jpg",
      ],
      author: "Anonymous",
      address: "1961 East Mall",
    },
    {
      id: 1,
      dateCreated: "01-06-2021",
      postTitle: "Untitled Post",
      price: 1000,
      imageURLs: [
        "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ikblearningcentre.jpg",
      ],
      author: "Anonymous",
      address: "1961 East Mall",
    },
    {
      id: 2,
      dateCreated: "01-06-2021",
      postTitle: "Untitled Post",
      price: 1000,
      imageURLs: [
        "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ikblearningcentre.jpg",
      ],
      author: "Anonymous",
      address: "1961 East Mall",
    },
    {
      id: 3,
      dateCreated: "01-06-2021",
      postTitle: "Untitled Post",
      price: 1000,
      imageURLs: [
        "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ikblearningcentre.jpg",
      ],
      author: "Anonymous",
      address: "1961 East Mall",
    },
    {
      id: 4,
      dateCreated: "01-06-2021",
      postTitle: "Untitled Post",
      price: 1000,
      imageURLs: [
        "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ikblearningcentre.jpg",
      ],
      author: "Anonymous",
      address: "1961 East Mall",
    },
  ]);

  // State to show/hide the NewPost component
  const [newPostVisible, setNewPostVisible] = useState(false);

  // Callback function called by the NewPost component
  const handleCloseModal = () => {
    setNewPostVisible(false);
  };

  const handleCreateButtonClick = () => {
    setNewPostVisible(true);
  };

  // Adds a post to the posts state
  // Callback function called by the NewPost component on form submission
  const addPost = (postInfo) => {
    const today = new Date();
    const day = `0${today.getDate()}`.slice(-2);
    const month = `0${today.getMonth() + 1}`.slice(-2);

    const postToAdd = {
      id: posts.length,
      // CITATION: The idea to use .slice(-2) to add leading zeros to the day/month from https://stackoverflow.com/a/3605248
      dateCreated: `${day}-${month}-${today.getYear() + 1900}`,
      postTitle: postInfo.postTitle,
      price: postInfo.price,
      paymentPeriod: postInfo.paymentPeriod,
      email: postInfo.email,
      address: postInfo.address,
      postalCode: postInfo.postalCode,
      leaseLength: postInfo.lease,
      bedrooms: postInfo.bedrooms,
      bathrooms: postInfo.bathrooms,
      squareFootage: postInfo.squareFootage,
      utilities: postInfo.utilities,
      pets: postInfo.pets,
      laundry: postInfo.laundry,
      furnished: postInfo.furnished,
      imageURLs: postInfo.images,
      author: "",
    };
    const updatedPosts = [...posts, postToAdd];
    setPosts(updatedPosts);
  };

  // Map the posts state to a list of Post components
  const postsList = posts.map((post) => (
    <Link to={`/post/${post.id}`} key={post.id}>
      <Post
        postId={post.id}
        postDate={post.dateCreated}
        postTitle={post.postTitle}
        price={post.price}
        mainImage={post.imageURLs[0]}
        author={post.author}
        address={post.address}
      />
    </Link>
  ));

  // Hooks for displaying <Schedule />
  const [displaySchedule, setDisplaySchedule] = useState(false);

  return (
    <div className="post_collection_div">
      <div id="post_collection_tools_div">
        <SearchBar />
        <Button
          id="createPostBtn"
          variant="primary"
          onClick={handleCreateButtonClick}
        >
          {" "}
          Post{" "}
        </Button>{" "}
      </div>

      <NewPost
        show={newPostVisible}
        handleClose={handleCloseModal}
        submit={addPost}
        setDisplaySchedule={setDisplaySchedule}
      />
      <Schedule show={displaySchedule} onHide={()=>setDisplaySchedule(false)} />
      <div className="post_scroll_div">{postsList}</div>
    </div>
  );
}

export default PostCollection;
