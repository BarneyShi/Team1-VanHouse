import React, { useRef, useState } from "react";
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
import {useLocation} from "react-router-dom"
import "../styles/postdetail.css";
import ReactMapGL, { Marker } from "react-map-gl";
import userLogo from "../assets/user.svg";
// import thumbUp from "../assets/thumb-up.svg";
import thumbDown from "../assets/thumb-down.svg";
import upVote from "../assets/thumbup-voted.svg";
// import downVote from "../assets/thumbdown-voted.svg";

export default function PostDetail() {
  // Temporarily get post info as props.
  // Once we integrate express and node, this will be done with a GET request
  const [postInfo, setPostInfo] = useState(useLocation().postObj); 

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

  // Comment function
  const commentRef = useRef();
  const [comments, setComments] = useState([
    {
      id: 0,
      username: "Anon0",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
    {
      id: 1,
      username: "Anon1",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
    {
      id: 2,
      username: "Anon2",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
    {
      id: 3,
      username: "Anon3",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
    {
      id: 4,
      username: "Anon4",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
  ]);
  const addComment = (event) => {
    event.preventDefault();
    const { value } = commentRef.current;
    setComments([
      ...comments,
      {
        id: comments.length,
        username: `Anon${comments.length}`,
        comment: value,
      },
    ]);
    commentRef.current.value = "";
  };

  // Schedule Hooks
  const [displaySchedule, setDisplaySchedule] = useState(false);
  const selectedDate = [
    { id: 0, date: "Sat Jan 1 2021" },
    { id: 1, date: "Thur Feb 2 2021" },
    { id: 2, date: "Wed Mar 3 2021" },
  ];

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100 post-detail-thumbnail"
                  src={postInfo.imageURLs[0]}
                  alt="thumbnail"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 post-detail-thumbnail"
                  src="https://www.thestreet.com/.image/t_share/MTY4NjM2OTcwNDU2NzIxMDMx/image-placeholder-title.jpg"
                  alt="thumbnail"
                />
              </Carousel.Item>
            </Carousel>
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
                3
              </span>
              <img
                className="thumb"
                id="thumbdown-icon"
                src={thumbDown}
                alt="thumb-down"
              />
              <span className="review-count" id="thumbdown-count">
                2
              </span>
            </span>

            <Button
              id="homeTourBtn"
              variant="info"
              onClick={() => setDisplaySchedule(true)}
            >
              Book a home tour!
            </Button>

            <Button variant="warning" id="reportBtn">
              Report
            </Button>
            <Button variant="danger" id="deleteBtn">
              Delete
            </Button>
          </Col>

          <Col xs={12} md={6}>
            <ListGroup>
              <ListGroupItem>
                Address: {postInfo.address}
              </ListGroupItem>
              <ListGroupItem>Price: {postInfo.price}</ListGroupItem>
              <ListGroupItem>Email: {postInfo.email}</ListGroupItem>
              <ListGroupItem>Lease Length: {postInfo.leaseLength}</ListGroupItem>
              <ListGroupItem>No Pets</ListGroupItem>
              <ListGroupItem>Unitilies Included</ListGroupItem>
              <ListGroupItem>In suite laundry</ListGroupItem>
            </ListGroup>
          </Col>

          <Col xs={12} md={6}>
            <ReactMapGL
              {...property}
              onViewportChange={(view) => setProperty(view)}
            >
              <Marker latitude={49.2827} longitude={-123.1207}>
                <span id="marker"></span>
              </Marker>
            </ReactMapGL>
          </Col>

          <Col id="comment">
            <h4 className="text-center">Comment</h4>
            {comments.map((e) => (
              <div className="comment__block" key={e.id}>
                <span className="commnet_userinfo">
                  <img
                    className="comment__img"
                    src={userLogo}
                    width="40"
                    alt="user_img"
                  />
                  <span className="comment__username">{e.username}</span>
                </span>
                <p className="comment__content">{e.comment}</p>
              </div>
            ))}

            <div className="comment__input">
              <form onSubmit={addComment}>
                <textarea
                  ref={commentRef}
                  name="newComment"
                  placeholder="Give us comment!"
                ></textarea>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </Col>

          {/* Schedule Modal */}
          <Modal
            show={displaySchedule}
            onHide={() => setDisplaySchedule(false)}
            centered
          >
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
        </Row>
      </Container>
    </>
  );
}
