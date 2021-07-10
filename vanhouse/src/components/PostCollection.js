// CITATION: Font awesome button reference: https://www.w3schools.com/howto/howto_css_icon_buttons.asp
// CITATION: I used this resource for learning about fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// TODO - hide create-post-button when not logged in

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Post from "./Post";
import NewPost from "./NewPost";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import "../styles/post.css";


function PostCollection({setSearchFilter}) {
  // Note: Temporarily adding in placeholder post JSON objects
  // The objects currently only contain info used in the main page post display, not the detail view.
  const [posts, setPosts] = useState([]);

  // State to show/hide the NewPost component
  const [newPostVisible, setNewPostVisible] = useState(false);

  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  function handleErrors(error) {
    if (typeof error.json === "undefined") {
      console.error(`${error};\n Can't connect to farm! Perhaps the server is down.`);
      alert("Can't connect to farm! Perhaps the server is down.");
      return;
    }
    error.json().then(errorRes => {
      const errorText = `${error.status} (${error.statusText}) ${errorRes.errorMessage}`;
      console.error(errorText);
      alert(errorText);
    }).catch(() => {
      const errorText = `${error.status} (${error.statusText})`;
      console.error(errorText);
      alert(errorText);
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://localhost:4000/posts");
      return response;
    }
    getPosts()
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setPosts(data);
        setIsLoadingPosts(false);
      })
      .catch(error => {
        handleErrors(error);
      });
  }, []);

  // Adds a post to the posts state
  // Callback function called by the NewPost component on form submission
  // CITATION: The idea to use .slice(-2) to add leading zeros to the day/month from https://stackoverflow.com/a/3605248
  const addPost = (postInfo) => {
    const today = new Date();
    const day = `0${today.getDate()}`.slice(-2);
    const month = `0${today.getMonth() + 1}`.slice(-2);

    const postToAdd = {
      id: posts.length,
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
      schedule: postInfo.schedule,
      author: "",
    };
    const updatedPosts = [...posts, postToAdd];
    setPosts(updatedPosts);
  };

  // Map the posts state to a list of Post components
  const postsList = posts.map((post) => (
    // Temporarily pass post object to PostDetail for display purposes,
    // Once we integrate express and node, we will instead use a GET request in PostDetail
    <Link to={{pathname: `/post/${post.id}`, postObj: post}} key={post.id}>
      <Post
        postId={post.id}
        postDate={post.dateCreated}
        postTitle={post.postTitle}
        price={post.price}
        mainImage={post.images[0]}
        author={post.author}
        address={post.address}
      />
    </Link>
  ));

  return (
    <div className="post_collection_div">
      <div id="post_collection_tools_div">
        <SearchBar getData={(i) => setSearchFilter(i)}/>
        <Button
          id="createPostBtn"
          variant="primary"
          onClick={() => setNewPostVisible(true)}
        >
          {" "}
          Post{" "}
        </Button>{" "}
      </div>

      <NewPost
        showModalForm={newPostVisible}
        handleClose={() => setNewPostVisible(false)}
        submit={addPost}
      />

      <div className="post_scroll_div">
        {postsList}
        {isLoadingPosts && <LoadingSpinner />}
        
      </div>
    </div>
  );
}

PostCollection.propTypes = {
  setSearchFilter: PropTypes.func.isRequired,
};

export default PostCollection;
