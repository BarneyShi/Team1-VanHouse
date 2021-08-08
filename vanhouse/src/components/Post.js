import React from "react";
import PropTypes from "prop-types";
import { Card, ListGroup } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
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
  address,
  paymentPeriod
}) {
  const { t, i18n } = useTranslation();
  return (
    <button type="button" className="post_div">
      <Card className="post_card">
        <div className="forceHeightDiv">
          <Card.Header className="post_header">{truncateString(postTitle, 100)}</Card.Header>
        </div>
        <Card.Img variant="top" src={mainImage} alt="thumbnail" />
        <Card.Body className="postCardBody">
            <Card.Subtitle className="post_datetext">{t('Date posted')}: {postDate.slice(0,10)}</Card.Subtitle>
            <ListGroup variant="flush" className="post_listgroup">
              <ListGroup.Item>${price} {t(paymentPeriod)} <br/></ListGroup.Item>
              <ListGroup.Item>{truncateString(address, 30)}</ListGroup.Item>
            </ListGroup>
        </Card.Body>
      </Card>
    </button>
  );
}

Post.defaultProps = {
  postTitle: "Untitled",
  mainImage:
    "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ikblearningcentre.jpg",
};

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  // postDate: PropTypes.instanceOf(Date).isRequired,
  postDate: PropTypes.string.isRequired,
  postTitle: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  paymentPeriod: PropTypes.string.isRequired,
  mainImage: PropTypes.string,
  address: PropTypes.string.isRequired,
};

export default Post;
