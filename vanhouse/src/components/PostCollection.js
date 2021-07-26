// CITATION: Font awesome button reference: https://www.w3schools.com/howto/howto_css_icon_buttons.asp
// CITATION: I used this resource for learning about fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// TODO - hide create-post-button when not logged in

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import Post from "./Post";
import NewPost from "./NewPost";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import getErrorString from "../utils";
import "./post.css";

function PostCollection({
  setSearchFilter,
  filterURL,
  userId,
  setQuery
}) {

  // State to hold posts retrieved from the server
  const [posts, setPosts] = useState([]);
  
  // State to hold filtered posts retrieved from the server
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [displayFiltered, setDisplayFiltered] = useState(false);

  // State to show/hide the NewPost component
  const [newPostVisible, setNewPostVisible] = useState(false);

  // Loading and error display states
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [displayError, setDisplayError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Query server for posts on mount
  useEffect(() => {
    setIsLoadingPosts(true);
    fetch("http://localhost:4000/posts")
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(data => {
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

  // Filter posts on state change
  useEffect(() => {
    // Display all saved posts if query string is empty
    if (filterURL === "") {
      setDisplayFiltered(false);
      return;
    }
    setIsLoadingPosts(true);
    fetch(filterURL)
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(data => {
        setFilteredPosts(data);
        setDisplayFiltered(true);
        setIsLoadingPosts(false);
      })
      .catch(error => {
        getErrorString(error).then((errText) => {
          setErrorMsg(errText);
          setDisplayError(true);
          setIsLoadingPosts(false);
        });
      });
  }, [filterURL]);

  // Create a POST request for a new rental listing
  const postRentalListing = async (postObj) => {
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

    postRentalListing(postToAdd)
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

  const postObjToComponent = ((post) => (
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

  // Map the posts state to a list of Post components
  const postsList = posts?.map((post) => (
    postObjToComponent(post)
  ));

  const filteredPostsList = filteredPosts?.map((post) => (
    postObjToComponent(post)
  ));

  return (
    <div className="post_collection_div">
      <div id="post_collection_tools_div" className="row">
        <div className="col-md-10 col-sm-12">
          <SearchBar
            getData={(i) => {
              setSearchFilter(i);
            }}
            setQuery = {setQuery}
            userId={userId}
          />
        </div>
        <div className="col-md-2 col-sm-12">
          <Button
            id="createPostBtn"
            variant="primary"
            onClick={() => setNewPostVisible(true)}
          >
            {" "}
            Post{" "}
          </Button>{" "}
        </div>
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
        {!displayFiltered && !isLoadingPosts && postsList}
        {displayFiltered && !isLoadingPosts && filteredPostsList}
        {isLoadingPosts && <LoadingSpinner />}
      </div>
    </div>
  );
}

PostCollection.propTypes = {
  setSearchFilter: PropTypes.func.isRequired,
  filterURL: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired
};

export default PostCollection;
