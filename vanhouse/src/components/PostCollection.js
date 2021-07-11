// CITATION: Font awesome button reference: https://www.w3schools.com/howto/howto_css_icon_buttons.asp
// CITATION: I used this resource for learning about fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// TODO - hide create-post-button when not logged in

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import Post from "./Post";
import NewPost from "./NewPost";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import getErrorString from "../utils";
import "../styles/post.css";


function PostCollection({setSearchFilter}) {
  // Note: Temporarily adding in placeholder post JSON objects
  // The objects currently only contain info used in the main page post display, not the detail view.
  const [posts, setPosts] = useState([]);

  // State to show/hide the NewPost component
  const [newPostVisible, setNewPostVisible] = useState(false);

  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [displayError, setDisplayError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
        getErrorString(error).then((errText) => {
          setErrorMsg(errText);
          setDisplayError(true);
          setIsLoadingPosts(false);
        });
      });
  }, []);

  const postPropertyListing = async (postObj) => {
    const response = await fetch("http://localhost:4000/newPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)
    });
    return response;
  }


  // Adds a post to the posts state
  // Callback function called by the NewPost component on form submission
  // CITATION: The idea to use .slice(-2) to add leading zeros to the day/month from https://stackoverflow.com/a/3605248
  const addPost = (postInfo) => {
    const today = new Date();
    const day = `0${today.getDate()}`.slice(-2);
    const month = `0${today.getMonth() + 1}`.slice(-2);

    const postToAdd = {
      id: "",
      date: `${day}-${month}-${today.getYear() + 1900}`,
      title: postInfo.postTitle,
      price: postInfo.price,
      images: postInfo.images,
      author: "",
      authorID: "",
      address: postInfo.address,
      postalCode: postInfo.postalCode,
      phone: postInfo.phone,
      email: postInfo.email,
      leaseLength: postInfo.lease,
      paymentPeriod: postInfo.paymentPeriod,
      bedrooms: postInfo.bedrooms,
      bathrooms: postInfo.bathrooms,
      sqft: postInfo.squareFootage,
      utilities: postInfo.utilities,
      laundry: postInfo.laundry,
      pets: postInfo.pets,
      furnished: postInfo.furnished,
      schedule: postInfo.schedule,
      comment: [],
      upvote: 0,
      downvote: 0
    };

    postPropertyListing(postToAdd)
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(data => {
        const updatedPosts = [...posts, data];
        setPosts(updatedPosts);
      })
      .catch(error => {
        getErrorString(error).then((errText) => {
          setErrorMsg(errText);
          setDisplayError(true);
          setIsLoadingPosts(false);
        });
      });
  };

  // Map the posts state to a list of Post components
  const postsList = posts.map((post) => (
    // Temporarily pass post object to PostDetail for display purposes,
    // Once we integrate express and node, we will instead use a GET request in PostDetail
    <Link to={{pathname: `/post/${post._id}`, postObj: post}} key={post._id}>
      <Post
        postId={post._id}
        postDate={post.date}
        postTitle={post.title}
        price={post.price}
        paymentPeriod={post.paymentPeriod}
        mainImage={post.images[0]}
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
        {displayError && 
          <Alert className="connection_error_alert" variant="danger" onClose={() => setDisplayError(false)} dismissible>
            <Alert.Heading> Error getting posts </Alert.Heading>
            <p>
              {errorMsg}
            </p>
          </Alert>
        }
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
