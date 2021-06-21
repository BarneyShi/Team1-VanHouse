import React from "react";
import PropTypes from "prop-types";

/**
 * Truncate a string and add ellipses if it is too long to display
 * @param str the string to truncate
 * @param maxSize the max length of the string (must be >= 4)
 */
function truncateString(str, maxSize) {
  if (str.length > maxSize) {
    return `${str.substring(0, maxSize - 3)}...`;
  }
  return str;
}

// Display a post on the main page
function Post({
  postId,
  postDate,
  postTitle,
  price,
  mainImage,
  author,
  address,
}) {
  return (
    <button type="button" className="post_div">
      <div className="post_header_div">
        <h3>{truncateString(postTitle, 50)}</h3>
      </div>
      <div className="post_image_div">
        <img src={mainImage} alt="thumbnail" />
      </div>
      <div className="post_summary_div">
        <p>Date posted: {postDate}</p>
        <h6>
          Price: ${price} <br />
          Address: {truncateString(address, 20)}
        </h6>
      </div>
    </button>
  );
}

Post.defaultProps = {
  postTitle: "Untitled",
  mainImage:
    "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ikblearningcentre.jpg",
  author: "anonymous",
};

Post.propTypes = {
  postId: PropTypes.number.isRequired,
  postDate: PropTypes.string.isRequired,
  postTitle: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  mainImage: PropTypes.string,
  author: PropTypes.string,
  address: PropTypes.string.isRequired,
};

export default Post;
