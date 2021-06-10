// CITATION: Font awesome button reference: https://www.w3schools.com/howto/howto_css_icon_buttons.asp
// TODO - hide create-post-button when not logged in

import { useState } from "react"
import Post from "./Post";
import NewPost from "./NewPost"
import SearchBar from './SearchBar'

function PostCollection(props) {
  // Note: Temporarily adding in placeholder post JSON objects
  // The objects currently only contain info used in the main page post display, not the detail view.
  const [posts, setPosts] = useState([{ "id":0,
                                        "dateCreated": "01-06-2021", 
                                        "postTitle": "Untitled Post", 
                                        "mainImage":"https://upload.wikimedia.org/wikipedia/commons/f/fd/Ikblearningcentre.jpg",
                                        "author":"Anonymous",
                                        "address": "1961 East Mall"}, 
                                        { "id":1,
                                        "dateCreated": "01-06-2021", 
                                        "postTitle": "Untitled Post", 
                                        "mainImage":"https://upload.wikimedia.org/wikipedia/commons/f/fd/Ikblearningcentre.jpg",
                                        "author":"Anonymous",
                                        "address": "1961 East Mall"},
                                        { "id":2,
                                        "dateCreated": "01-06-2021", 
                                        "postTitle": "Untitled Post", 
                                        "mainImage":"https://upload.wikimedia.org/wikipedia/commons/f/fd/Ikblearningcentre.jpg",
                                        "author":"Anonymous",
                                        "address": "1961 East Mall"},
                                        { "id":3,
                                        "dateCreated": "01-06-2021", 
                                        "postTitle": "Untitled Post", 
                                        "mainImage":"https://upload.wikimedia.org/wikipedia/commons/f/fd/Ikblearningcentre.jpg",
                                        "author":"Anonymous",
                                        "address": "1961 East Mall"},
                                        { "id":4,
                                        "dateCreated": "01-06-2021", 
                                        "postTitle": "Untitled Post", 
                                        "mainImage":"https://upload.wikimedia.org/wikipedia/commons/f/fd/Ikblearningcentre.jpg",
                                        "author":"Anonymous",
                                        "address": "1961 East Mall"}]);
  
  // State to show/hide the NewPost component
  const [newPostVisible, setNewPostVisible] = useState(false); 

  // Map the posts state to a list of Post components
  const postsList = posts.map((post) => 
    <Post key={post.id}
          postId={post.id} 
          postDate={post.dateCreated}
          postTitle={post.postTitle} 
          mainImage={post.imgURL} 
          author={post.author} 
          address={post.address} 
          handleClick={id => {handlePostClick(id)}}/>
  );


  // Callback function called by the Post component
  const handlePostClick = (postId) => {
    // TODO - open the corresponding PostDetail view
    console.log("Clicked post with id = " + postId);
  }

  // Callback function called by the NewPost component
  const handleCloseModal = () => {
    setNewPostVisible(false);
  }

  const handleCreateButtonClick = () => {
    setNewPostVisible(true);
  }

  // Adds a post to the posts state
  // Callback function called by the NewPost component on form submission
  const addPost = (postInfo) => {
    let today = new Date();

    const postToAdd = { "id": posts.length,
                        "dateCreated": (today.getDay()+1) + "-" + (today.getMonth()+1) + "-" + today.getYear(), 
                        "postTitle": postInfo.postTitle, 
                        "mainImage": null,
                        "author": "",
                        "address": postInfo.address};
    const updatedPosts = [...posts, postToAdd];
    setPosts(updatedPosts);
  }

  return(
    <div className="post_collection_div">
      <SearchBar />
      <NewPost show={newPostVisible} handleClose={handleCloseModal} submit={addPost}/>
      <div className="post_scroll_div">
        {postsList}
      </div>
      <div className="create_post_button_div">
        <button className="create_post_button" onClick={handleCreateButtonClick}>
          <i className="fa fa-plus-circle"></i>
        </button>
      </div>
    </div>
    
  );
}

export default PostCollection;