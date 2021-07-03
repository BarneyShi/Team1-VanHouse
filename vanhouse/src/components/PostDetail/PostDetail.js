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
import { useParams, useLocation } from "react-router-dom";
import "../../styles/postdetail.css";
import ReactMapGL, { Marker } from "react-map-gl";
import Report from "./Report";
import userLogo from "../../assets/user.svg";
// import thumbUp from "../assets/thumb-up.svg";
import thumbDown from "../../assets/thumb-down.svg";
import upVote from "../../assets/thumbup-voted.svg";
// import downVote from "../assets/thumbdown-voted.svg";
import LoadingSpinner from "../LoadingSpinner";

export default function PostDetail() {
  const [postInfo, setPostInfo] = useState({
    address: "",
    title: "Untitled",
    date: "",
    postalCode: "",
    email: "",
    price: -1,
    paymentPeriod: "",
    bedrooms: -1,
    bathrooms: -1,
    sqft: -1,
    leaseLength: 0,
    pets: "",
    utilities: "",
    laundry: "",
    furnished: "",
    images: [],
    schedule: [],
    comment: [],
    rating: [],
    upvote: 0,
    downvote: 0,
  });

  const [loaded, setLoaded] = useState(false);

  // Comment function
  const commentRef = useRef();
  const [comments, setComments] = useState([
    {
      id: 0,
      user: "Anon0",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
    {
      id: 1,
      user: "Anon1",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
    {
      id: 2,
      user: "Anon2",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
    {
      id: 3,
      user: "Anon3",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
    {
      id: 4,
      user: "Anon4",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
  ]);
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

  const { id } = useParams();

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
        setPostInfo(data.postInfo);
        setComments(data.comments);
        setLoaded(true);
      })
      .catch((error) => {
        // handleErrors(error);
      });
  }, []);

  // Maps post images to carousel items.
  // Note: It should be okay to use idx as a key because images are static for each post
  const carouselItems = postInfo.images.map((image, idx) => {
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

  const listGroupItems = (
    <ListGroup>
      {postInfo.title !== "Untitled" && (
        <ListGroupItem>
          {" "}
          <b>{postInfo.title}</b>{" "}
        </ListGroupItem>
      )}
      {postInfo.address !== "" && (
        <ListGroupItem> {postInfo.address} </ListGroupItem>
      )}
      {postInfo.price !== -1 && (
        <ListGroupItem>
          {" "}
          ${postInfo.price} {postInfo.paymentPeriod}{" "}
        </ListGroupItem>
      )}
      {postInfo.leaseLength !== 0 && (
        <ListGroupItem> {postInfo.leaseLength} month lease </ListGroupItem>
      )}
      {postInfo.sqft !== -1 && (
        <ListGroupItem> {postInfo.sqft} sqft </ListGroupItem>
      )}
      {postInfo.bedrooms !== -1 && (
        <ListGroupItem> Bedrooms: {postInfo.bedrooms} </ListGroupItem>
      )}
      {postInfo.bathrooms !== -1 && (
        <ListGroupItem> Bathrooms: {postInfo.bathrooms} </ListGroupItem>
      )}
      {postInfo.utilities !== "" && (
        <ListGroupItem>
          {" "}
          {(postInfo.utilities && "Utilities included") ||
            (!postInfo.utilities && "Utilities not included")}{" "}
        </ListGroupItem>
      )}
      {postInfo.laundry !== "" && (
        <ListGroupItem>
          {" "}
          {(postInfo.laundry && "Ensuite laundry") ||
            (!postInfo.laundry && "No ensuite laundry")}
        </ListGroupItem>
      )}
      {postInfo.furnished !== "" && (
        <ListGroupItem>
          {(postInfo.furnished && "Furnished") ||
            (!postInfo.furnished && "Unfurnished")}
        </ListGroupItem>
      )}
      <ListGroupItem>
        {(postInfo.pets && "Pets allowed") || (!postInfo.pets && "No pets")}
      </ListGroupItem>
      {postInfo.email !== "" && <ListGroupItem>{postInfo.email}</ListGroupItem>}
    </ListGroup>
  );

  // Schedule Hooks
  const [displaySchedule, setDisplaySchedule] = useState(false);
  const selectedDate = [
    { id: 0, date: "Sat Jan 1 2021" },
    { id: 1, date: "Thur Feb 2 2021" },
    { id: 2, date: "Wed Mar 3 2021" },
  ];

  // Report function hooks
  const [displayReport, setDisplayReport] = useState(false);

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
                {postInfo.upvote}
              </span>
              <img
                className="thumb"
                id="thumbdown-icon"
                src={thumbDown}
                alt="thumb-down"
              />
              <span className="review-count" id="thumbdown-count">
                {postInfo.downvote}
              </span>
            </span>

            <Button
              id="homeTourBtn"
              variant="info"
              onClick={() => setDisplaySchedule(true)}>
              Book a home tour!
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
            <ListGroup>
              <ListGroupItem>Address: {postInfo.address}</ListGroupItem>
              <ListGroupItem>
                Price: ${postInfo.price} {postInfo.paymentPeriod}
              </ListGroupItem>
              {postInfo.email !== "" && (
                <ListGroupItem>Email: {postInfo.email}</ListGroupItem>
              )}
              <ListGroupItem>
                Lease Length: {postInfo.leaseLength}
              </ListGroupItem>
              <ListGroupItem>{postInfo.pets}</ListGroupItem>
              <ListGroupItem>{postInfo.utilities}</ListGroupItem>
              <ListGroupItem>{postInfo.laundry}</ListGroupItem>
              <ListGroupItem>{postInfo.furnished}</ListGroupItem>
            </ListGroup>
          </Col>

          <Col xs={12} md={6}>
            <ReactMapGL
              {...property}
              onViewportChange={(view) => setProperty(view)}>
              <Marker latitude={49.2827} longitude={-123.1207}>
                <span id="marker"></span>
              </Marker>
            </ReactMapGL>
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
        </Row>
      </Container>
    </>
  );
}
