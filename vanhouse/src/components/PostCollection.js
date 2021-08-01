// CITATION: Font awesome button reference: https://www.w3schools.com/howto/howto_css_icon_buttons.asp
// CITATION: I used this resource for learning about fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import Post from "./Post";
import NewPost from "./NewPost";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import { getErrorString } from "../utils";
import "./post.css";

function PostCollection({
  setSearchFilter,
  filterURL,
  userId,
  appPosts,
  setAppPosts,
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
  const [fetchingNextPosts, setFetchingNextPosts] = useState(false);
  const [morePostsAvailable, setMorePostsAvailable] = useState(true);
  const [displayError, setDisplayError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [user, setUser] = useState();

  const fetchSpinnerRef = useRef();

  // Query server for posts on mount
  useEffect(() => {
    setIsLoadingPosts(true);
    if (appPosts.length > 0) {
      setPosts(appPosts);
      setIsLoadingPosts(false);
      return;
    }
    fetch("/posts")
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(data => {
        setIsLoadingPosts(false);
        setPosts(data);
      })
      .catch(error => {
        setIsLoadingPosts(false);
        getErrorString(error).then((errText) => {
          setErrorMsg(errText);
          setDisplayError(true);
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

  useEffect(() => {
    setAppPosts(posts);
  }, [posts]);

  // CITATION: syntax to avoid ESLint error on return block statement: https://stackoverflow.com/a/55937086
  useEffect(() => () => setQuery(""), []);

  // Create a POST request for a new rental listing
  const postRentalListing = async (postObj) => {
    const response = await fetch("/newPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(postObj)
    });
    return response;
  }

  // Adds a post to the posts state
  // Callback function called by the NewPost component on form submission
  // CITATION: The idea to use .slice(-2) to add leading zeros to the day/month from https://stackoverflow.com/a/3605248
  const addPost = async (postInfo) => {
    const postToAdd = {
      id: "",
      date: new Date(),
      title: postInfo.postTitle,
      price: postInfo.price,
      images: postInfo.images,
      mainImage: postInfo.mainImage,
      author: user.username,
      authorID: user.userId,
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

    const res = await postRentalListing(postToAdd);
    try {
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      const updatedPosts = [data, ...posts];
      setPosts(updatedPosts);
    }
    catch(error) {
      const errText = await getErrorString(error);
      setErrorMsg(errText);
      setDisplayError(true);
    }
    return true;
  };

  // Present the NewPost modal view if the user is logged in
  const presentCreatePost = async () => {
    try {
      const response = await fetch(
        "/login-router/account",
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Please login to create a new post");
      }
      const data = await response.json();
      setUser({ userId: data.userId, username: data.firstName });
      setNewPostVisible(true);
    } catch (err) {
      setUser();
      setErrorMsg(err.message);
      setDisplayError(true);
      console.log("Error while checking auth:", err.message);
    }
  }

  // Wrap Post components in Link components to connect to postDetail route
  const postObjToComponent = ((post) => (
    <Link to={{pathname: `/post/${post._id}`, postObj: post}} key={post._id}>
      <Post
        postId={post._id}
        postDate={post.date}
        postTitle={post.title}
        price={post.price}
        paymentPeriod={post.paymentPeriod}
        mainImage={post.mainImage}
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

  // Fetch some more posts from the server
  // Called when the "See more posts..." button is clicked
  const getMorePosts = () => {
    setFetchingNextPosts(true);
    fetch("/postsPage")
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(data => {
        setFetchingNextPosts(false);
        console.log(data.length);
        if (data.length === 0) {
          setMorePostsAvailable(false);
          return;
        }
        const newPosts = [...posts, ...data];
        setPosts(newPosts);
      })
      .catch(error => {
        setFetchingNextPosts(false);
        getErrorString(error).then((errText) => {
          setErrorMsg(errText);
          setDisplayError(true);
        });
      });
  }

  // Scroll to bottom of the component when fetching new posts
  // CITATION: I found the scrollIntoView function here: https://stackoverflow.com/q/45719909 
  useEffect(() => {
    fetchSpinnerRef.current?.scrollIntoView({behavior: "smooth"});
  }, [fetchingNextPosts]);

  return (
    <div className="post_collection_div">
      <div id="post_collection_tools_div">
        <div id="searchDiv">
          <SearchBar
            getData={(i) => {
              setSearchFilter(i);
            }}
            setQuery = {setQuery}
            userId={userId}
          />
        </div>
        <div id="createPostDiv">
          <Button
            id="createPostBtn"
            variant="primary"
            onClick={presentCreatePost}
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
      {displayError && 
        <Alert className="connection_error_alert" variant="danger" onClose={() => setDisplayError(false)} dismissible>
          <Alert.Heading> Oops </Alert.Heading>
          <p>
            {errorMsg}
          </p>
        </Alert>
      }
      <div className="post_scroll_div">
        {!displayFiltered && !isLoadingPosts && postsList}
        {displayFiltered && !isLoadingPosts && filteredPostsList}
        {isLoadingPosts && <LoadingSpinner />}
        {fetchingNextPosts && <div id="fetchSpinnerDiv" ref={fetchSpinnerRef}><LoadingSpinner /></div>}
        {!isLoadingPosts && !fetchingNextPosts && morePostsAvailable &&
          <div id="getMorePostsDiv">
            <Button id="getMorePostsBtn" variant="link" onClick={getMorePosts}>
              See more posts...
            </Button>
          </div>
        }
      </div>
    </div>
  );
}

PostCollection.propTypes = {
  setSearchFilter: PropTypes.func.isRequired,
  filterURL: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  appPosts: PropTypes.instanceOf(Array).isRequired,
  setAppPosts: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired
};

export default PostCollection;

