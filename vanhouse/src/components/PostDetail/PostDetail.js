import React, { useRef, useState, useEffect } from "react";
import {
  Carousel,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../../styles/postdetail.css";
import ReactMapGL, { Marker } from "react-map-gl";
import Report from "./Report";
import EditPost from "./EditPost";
import userLogo from "../../assets/user.svg";
// import thumbUp from "../assets/thumb-up.svg";
import thumbDown from "../../assets/thumb-down.svg";
import upVote from "../../assets/thumbup-voted.svg";
// import downVote from "../assets/thumbdown-voted.svg";
import LoadingSpinner from "../LoadingSpinner";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [loaded, setLoaded] = useState(false);

  // Get the post from the react router params when component mounts and set postInfo state
  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`http://localhost:4000/post/${id}`);
      return response;
    };

    getPost()
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPost(data.postInfo);
        setComments(data.comments);
        setLoaded(true);
      })
      .catch((error) => {
        // handleErrors(error);
      });
  }, []);

  // Comment function
  const commentRef = useRef();
  const addComment = (event) => {
    event.preventDefault();
    const { value } = commentRef.current;
    setComments([
      ...comments,
      {
        id: comments.length,
        user: `Anon${comments.length}`,
        text: value,
      },
    ]);
    commentRef.current.value = "";
  };

  // Maps post images to carousel items.
  // Note: It should be okay to use idx as a key because images are static for each post
  const carouselItems = post?.images.map((image, idx) => {
    const keyId = idx + 1;
    return (
      <Carousel.Item key={keyId}>
        <img
          className="d-block w-100 post-detail-thumbnail"
          src={image}
          alt="thumbnail"
        />
      </Carousel.Item>
    );
  });

  const mapToken =
    "pk.eyJ1IjoiaWR1bm5vY29kaW5nOTUiLCJhIjoiY2tlMTFiMDh4NDF4cTJ5bWgxbDUxb2M5ciJ9.-L_x_0HZGSXFMRdactrn-Q";
  const [property, setProperty] = useState({
    width: "100%",
    height: "100%",
    latitude: 49.2827,
    longitude: -123.1207,
    zoom: 11,
    mapboxApiAccessToken: mapToken,
  });

  // Schedule Hooks
  const [displaySchedule, setDisplaySchedule] = useState(false);
  const selectedDate = [
    { id: 0, date: "Sat Jan 1 2021" },
    { id: 1, date: "Thur Feb 2 2021" },
    { id: 2, date: "Wed Mar 3 2021" },
  ];

  // Report function hooks
  const [displayReport, setDisplayReport] = useState(false);

  // Full info hooks
  const [showFullInfo, setShowFullInfo] = useState(false);

  // Edit post hooks
  const [displayEditModal, setDisplayEditModal] = useState(false);

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12}>
            {loaded && <Carousel>{carouselItems}</Carousel>}
            {!loaded && <LoadingSpinner />}
          </Col>

          <Col xs={12}>
            <span className="post-rate">
              <img
                className="thumb"
                id="thumbup-icon"
                src={upVote}
                alt="thumb-up"
              />
              <span className="review-count" id="thumbup-count">
                {post?.upvote}
              </span>
              <img
                className="thumb"
                id="thumbdown-icon"
                src={thumbDown}
                alt="thumb-down"
              />
              <span className="review-count" id="thumbdown-count">
                {post?.downvote}
              </span>
            </span>

            <Button
              id="homeTourBtn"
              variant="info"
              onClick={() => setDisplaySchedule(true)}>
              Book a home tour!
            </Button>

            <Button
              onClick={() => setDisplayEditModal(true)}
              id="editPost--btn">
              Edit Post
            </Button>

            <Button
              variant="warning"
              id="reportBtn"
              onClick={() => setDisplayReport(true)}>
              Report
            </Button>
            <Button variant="danger" id="deleteBtn">
              Delete
            </Button>
          </Col>

          <Col xs={12} md={6}>
            {loaded ? (
              <ListGroup>
                <ListGroupItem>Address: {post.address}</ListGroupItem>
                <ListGroupItem>
                  Price: ${post.price} {post.paymentPeriod}
                </ListGroupItem>
                {post.email !== "" && (
                  <ListGroupItem>Email: {post.email}</ListGroupItem>
                )}
                <ListGroupItem>
                  {post.pets ? "Pets friendly" : "No pets"}
                </ListGroupItem>
                <ListGroupItem>
                  {post.utilities ? "Utility included" : "Utility not included"}
                </ListGroupItem>
                <ListGroupItem>
                  {post.laundry ? "No ensuite laundry" : "Ensuite laundry"}
                </ListGroupItem>
                <ListGroupItem>
                  {post.furnished ? "Furnished" : "Unfurnished"}
                </ListGroupItem>
                <Button
                  id="viewFullInfoBtn"
                  onClick={() => setShowFullInfo(true)}
                  variant="success">
                  View More
                </Button>
              </ListGroup>
            ) : (
              <LoadingSpinner />
            )}
          </Col>

          <Col xs={12} md={6}>
            {loaded ? (
              <ReactMapGL
                {...property}
                onViewportChange={(view) => setProperty(view)}>
                <Marker latitude={49.2827} longitude={-123.1207}>
                  <span id="marker"></span>
                </Marker>
              </ReactMapGL>
            ) : (
              <LoadingSpinner />
            )}
          </Col>

          <Col id="comment">
            <h4 className="text-center">Comment</h4>
            {loaded &&
              comments.map((e) => (
                <div className="comment__block" key={e.id}>
                  <span className="commnet_userinfo">
                    <img
                      className="comment__img"
                      src={userLogo}
                      width="40"
                      alt="user_img"
                    />
                    <span className="comment__username">{e.user}</span>
                  </span>
                  <p className="comment__content">{e.text}</p>
                </div>
              ))}
            {!loaded && <LoadingSpinner />}
            <div className="comment__input">
              <form onSubmit={addComment}>
                <textarea
                  ref={commentRef}
                  name="newComment"
                  placeholder="Leave a comment!"></textarea>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </Col>

          {/* Schedule Modal */}
          <Modal
            show={displaySchedule}
            onHide={() => setDisplaySchedule(false)}
            centered>
            <Modal.Header closeButton>
              <Modal.Title>You can contact the landlord on</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListGroup id="date-list-group">
                {selectedDate.map((object) => (
                  <span className="date-list-item" key={object.id}>
                    <ListGroup.Item variant="primary">
                      {object.date}
                    </ListGroup.Item>
                  </span>
                ))}
              </ListGroup>
            </Modal.Body>
          </Modal>

          {/* Report Modal */}
          <Report
            displayReport={displayReport}
            setDisplayReport={setDisplayReport}
          />

          {/* Full info modal */}
          {loaded ? (
            <Modal
              show={showFullInfo}
              onHide={() => setShowFullInfo(false)}
              centered>
              <Modal.Header closeButton>
                <Modal.Title>Full info</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ListGroup>
                  <ListGroupItem>Address: {post.address}</ListGroupItem>
                  <ListGroupItem>
                    Price: ${post.price} {post.paymentPeriod}
                  </ListGroupItem>
                  {post.email !== "" && (
                    <ListGroupItem>Email: {post.email}</ListGroupItem>
                  )}
                  <ListGroupItem>
                    Lease Length: {post.leaseLength}
                  </ListGroupItem>
                  <ListGroupItem>
                    {post.pets ? "Pets friendly" : "No pets"}
                  </ListGroupItem>
                  <ListGroupItem>
                    {post.utilities
                      ? "Utility included"
                      : "Utility not included"}
                  </ListGroupItem>
                  <ListGroupItem>
                    {post.laundry ? "No in-suite laundry" : "In-suite laundry"}
                  </ListGroupItem>
                  <ListGroupItem>
                    {post.furnished ? "Furnished" : "Not furnished"}
                  </ListGroupItem>
                  <ListGroupItem>Bedroom: {post.bedrooms}</ListGroupItem>
                  <ListGroupItem>Bathroom: {post.bathrooms}</ListGroupItem>
                  <ListGroupItem>Square feet: {post.sqft}</ListGroupItem>
                  <ListGroupItem>
                    Lease length: {post.leaseLength}
                  </ListGroupItem>
                </ListGroup>
              </Modal.Body>
            </Modal>
          ) : (
            <LoadingSpinner />
          )}

          <EditPost
            show={displayEditModal}
            setDisplay={setDisplayEditModal}
            post={post}
          />
        </Row>
      </Container>
    </>
  );
}
