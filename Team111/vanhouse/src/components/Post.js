
// Display a post on the main page
function Post(props) {
  
  const handleClick = () => {
    // Pass the post id to the PostCollection component on click
    props.handleClick(props.postId);
  }

  return (
    <div className="post_div" onClick={handleClick}>
      <div className="post_header_div">
        <h3>{truncateString(props.postTitle,40) || "Untitled"}</h3>
      </div>
      <div className="post_image_div">
        <img src={props.mainImage || "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ikblearningcentre.jpg"} alt="thumbnail"/>
      </div>    
      <div className="post_summary_div">
        <label>Date posted: {props.postDate || "02-06-2021"}</label>
        <h6>
          Address: { truncateString(props.address, 20) || "1961 East Mall"} <br/> 
          Author: {props.author || "Anonymous"}
        </h6>
      </div>
    </div>
  );
}

/**
 * Truncate a string and add ellipses if it is too long to display
 * @param str the string to truncate
 * @param maxSize the max length of the string (must be >= 4)
 */
function truncateString(str, maxSize) {
  if(str.length > maxSize) {
    return str.substring(0,maxSize-3) + "...";
  }
  return str;
}

export default Post;