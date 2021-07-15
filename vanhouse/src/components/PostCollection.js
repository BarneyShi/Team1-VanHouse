// CITATION: Font awesome button reference: https://www.w3schools.com/howto/howto_css_icon_buttons.asp
// TODO - hide create-post-button when not logged in

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Post.css";
import NewPost from "./NewPost";
import Post from "./Post";
import SearchBar from "./SearchBar";

function PostCollection({
  setSearchFilter,
  filterPost,
  setStorePost,
  reset,
  filterIdx,
}) {
  // Note: Temporarily adding in placeholder post JSON objects
  // The objects currently only contain info used in the main page post display, not the detail view.

  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:4000/getpost",
  //    { method: "GET" })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //       setPosts(res);
  //     });
  // }, [filterIdx]);

  useEffect(() => {
    console.log("fetch1");
    (async () => {
      fetch("http://localhost:4000/getpost", 
      { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
        console.log(res);

          setPosts(res);
        });
      // const json = await fetch("http://localhost:4000/getpost", { method: "GET" });
      // console.log(json);
      // console.log('fetch22');
      // setPosts(json.json());
    })();
  }, []);

  useEffect(() => {
    setPosts(filterPost);
  }, [filterPost]);

  // State to show/hide the NewPost component
  const [newPostVisible, setNewPostVisible] = useState(false);

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
      images: postInfo.images,
      schedule: postInfo.schedule,
      author: "",
    };

    // fetch("http://localhost:4000/createpost?data=", {
    //   method: "get",
    //   body: JSON.stringify({
    //     data: postToAdd,
    //     cc: "yahahh",
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   });

    const updatedPosts = [...posts, postToAdd];
    setPosts(updatedPosts);
  };

  // Map the posts state to a list of Post components
  const postsList = posts?.map((post) => (
    // Temporarily pass post object to PostDetail for display purposes,
    // Once we integrate express and node, we will instead use a GET request in PostDetail
    <Link to={{ pathname: `/post/${post.id}`, postObj: post }} key={post.id}>
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
        <SearchBar
          getData={(i) => {
            setSearchFilter(i);
          }}
        />
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
      <div className="post_scroll_div">{postsList}</div>
    </div>
  );
}

PostCollection.propTypes = {
  setSearchFilter: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired,
  filterPost: PropTypes.instanceOf(Array).isRequired,
  filterIdx: PropTypes.number.isRequired,
  setStorePost: PropTypes.func.isRequired,
};

export default PostCollection;
