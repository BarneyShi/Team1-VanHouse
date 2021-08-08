import React, { useRef, useState, useEffect } from "react";
import {
  Alert,
  Carousel,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import "../../styles/postdetail.css";
import ReactMapGL, { Marker } from "react-map-gl";
import Report from "./Report";
import EditPost from "./EditPost";
import userLogo from "../../assets/user.svg";
import thumbUp from "../../assets/thumb-up.svg";
import thumbDown from "../../assets/thumb-down.svg";
import upVote from "../../assets/thumbup-voted.svg";
import downVote from "../../assets/thumbdown-voted.svg";
import editIcon from "../../assets/editIcon.png";
import LoadingSpinner from "../LoadingSpinner";
import { getErrorString } from "../../utils";
import { useTranslation } from 'react-i18next';
import event from '../Events';

export default function PostDetail() {
  const mapToken =
    "pk.eyJ1IjoiaWR1bm5vY29kaW5nOTUiLCJhIjoiY2tlMTFiMDh4NDF4cTJ5bWgxbDUxb2M5ciJ9.-L_x_0HZGSXFMRdactrn-Q";

  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState();
  const [post, setPost] = useState();
  const [schedule, setSchedule] = useState([]);
  const [comments, setComments] = useState();
  const [vote, setVote] = useState({ upvote: false, downvote: false });
  const [rating, setRating] = useState();
  const [postLoaded, setPostLoaded] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [coords, setCoords] = useState({
    latitude: 49.2827,
    longitude: -123.1207,
  });
  const [property, setProperty] = useState({
    width: "100%",
    height: "100%",
    latitude: 49.2827,
    longitude: -123.1207,
    zoom: 11,
    mapboxApiAccessToken: mapToken,
  });

  const { t, i18n } = useTranslation();
  let eventNames = event.eventNames();
  let loginFun = loginUser=>{
    // console.log("receive user login!!", loginUser);
    // console.log("before login user", user);
    setUser({ userId: loginUser.userId, username: loginUser.firstName });

    // console.log("after login user", user);

  };

  let logoutFun = loginUser=>{
    // console.log("receive user logout!!");
    setUser(null);
    // updateAccount();
  };
  // console.log("post detail eventnames: ", eventNames);
  if(eventNames.includes('user_login')){
    event.removeListener("user_login", loginFun);
    event.removeListener("user_logout", logoutFun);
  }
  event.addListener('user_login', loginFun);
  event.addListener('user_logout', logoutFun);

  useEffect(async () => {
    let postData;
    try {
      const postResponse = await fetch(`/post/${id}`);
      postData = await postResponse.json();
      setPost(postData.postInfo);
      setComments(postData.comments);
      setSchedule(postData.availableDates);
      setRating({
        upvote: postData.postInfo?.upvote,
        downvote: postData.postInfo?.downvote,
      });
      setPostLoaded(true);
    } catch (err) {
      getErrorString(err).then((errText) => {
        setErrorMsg(errText);
        setDisplayError(true);
      });
    }

    try {
      const response = await fetch("/login-router/account", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Not logged in");
      }
      const data = await response.json();
      setUser({ userId: data.userId, username: data.firstName });
    } catch (err) {
      setUser();
      // console.log("Error while checking auth:", err.message);
    }

    try {
      const coordsResponse = await fetch(
        `/post/${id}/coords?location=${postData.postInfo.postalCode}`
      );
      const data = await coordsResponse.json();
      setProperty({
        width: "100%",
        height: "100%",
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        zoom: 11,
        mapboxApiAccessToken: mapToken,
      });
      setCoords({
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
      });
      setMapLoaded(true);
    } catch (err) {
      getErrorString(err).then((errText) => {
        setErrorMsg(errText);
        setDisplayError(true);
      });
    }

    // try {
    //   const response = await fetch("/login-router/account", {
    //     credentials: "include",
    //   });
    //   if (!response.ok) {
    //     throw new Error("Not logged in");
    //   }
    //   const data = await response.json();
    //   setUser({ userId: data.userId, username: data.firstName });
    // } catch (err) {
    //   setUser();
    //   // console.log("Error while checking auth:", err.message);
    // }
  }, []);

  // Check if the user's rated this post
  useEffect(async () => {
    try {
      if (!user) throw Error("Not logged in");
      console.log("check user vote Info");
      const response = await fetch(
        `/post/${post._id}/checkvote?userId=${user.userId}`
      );
      if (!response.ok) throw Error("Failed to reach endpoint - checkvote");
      const data = await response.json();
      setVote(data);
    } catch (err) {
      // console.log("Error while checking vote:", err.message);
    }
  }, [rating, user]);

  // Comment function
  const commentRef = useRef();
  const addComment = (event) => {
    event.preventDefault();
    const { value } = commentRef.current;
    if (value === "") {
      setDisplayError(true);
      setErrorMsg("Comment cannot be empty");
      return;
    }
    if (!user) {
      setDisplayError(true);
      setErrorMsg("Please login first");
      return;
    }
    const form = new FormData();
    form.append("newComment", value);
    form.append("userId", user.userId);
    form.append("username", user.username);
    fetch(`/post/${post.id}/comment`, {
      method: "POST",
      body: form,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([
          ...comments,
          {
            _id: data._id,
            username: data.user,
            text: data.comment.text,
            date: data.today,
          },
        ]);
        commentRef.current.value = "";
      })
      .catch((err) => console.log("Error while commenting ", err));
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

  // Schedule Hooks
  const [displaySchedule, setDisplaySchedule] = useState(false);

  // Report function hooks
  const [displayReport, setDisplayReport] = useState(false);

  // Full info hooks
  const [showFullInfo, setShowFullInfo] = useState(false);

  // Edit post hooks
  const [displayEditModal, setDisplayEditModal] = useState(false);

  // Rating
  const votePost = (method) => async () => {
    try {
      if (!user) {
        setDisplayError(true);
        setErrorMsg("Please log in first");
        return;
      }
      const response = await fetch(
        `/post/${post._id}/vote?userId=${user.userId}&method=${method}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("failed to rate");
      }
      const data = await response.json();
      setRating({ upvote: data.upvote, downvote: data.downvote });
    } catch (err) {
      console.log("Error while rating:", err);
    }
  };
  // Delete post
  const deletePost = async () => {
    try {
      const response = await fetch(`/post/${post._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw Error("failed to delete");
      }
      await response.json();
      history.push("/");
      history.go(0);
    } catch (err) {
      console.log("Error while deleting post:", err);
    }
  };
  // Delete comment: TODO
  const renderCommentTooltip = (props) => <Tooltip {...props}>Delete</Tooltip>;
  const deleteComment = async (e) => {
    try {
      const commentId = e.target.getAttribute("data-id");
      const response = await fetch(
        `/post/${post._id}/comment?commentId=${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw Error("Response error");
      }
      const data = await response.json();
      const { _id: deleteCommentId } = data;
      const res = comments.filter((c) => c._id !== deleteCommentId);
      setComments([...res]);
    } catch (err) {
      console.log("Error while deleting comment:", err);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          {/* Error Message  */}
          {displayError && (
            <Alert
              id="postdetail_error_alert"
              variant="danger"
              onClose={() => {
                setDisplayError(false);
                setErrorMsg("");
              }}
              dismissible>
              <Alert.Heading>Oops!</Alert.Heading>
              <p>{errorMsg}</p>
            </Alert>
          )}

          <Col xs={12}>
            {postLoaded ? (
              <Carousel>{carouselItems}</Carousel>
            ) : (
              <LoadingSpinner />
            )}
          </Col>

          <Col xs={12}>
            <span className="post-rate">
              <img
                className="thumb"
                id="thumbup-icon"
                src={vote?.upvote ? upVote : thumbUp}
                alt="thumb-up"
                onClick={votePost("upvote")}
              />
              <span className="review-count" id="thumbup-count">
                {rating?.upvote}
              </span>
              <img
                className="thumb"
                id="thumbdown-icon"
                src={vote?.downvote ? downVote : thumbDown}
                alt="thumb-down"
                onClick={votePost("downvote")}
              />
              <span className="review-count" id="thumbdown-count">
                {rating?.downvote}
              </span>
            </span>

            <Button
              id="homeTourBtn"
              variant="info"
              onClick={() => setDisplaySchedule(true)}>
              { t('Book a home tour!')}
            </Button>
            {user && post && user.userId === post.authorID ? (
              <Button
                onClick={() => setDisplayEditModal(true)}
                id="editPost--btn">
                {t('Edit Post')}
              </Button>
            ) : null}

            <Button
              variant="warning"
              id="reportBtn"
              onClick={() => setDisplayReport(true)}>
              {t('Report')}
            </Button>
            {user && post && user.userId === post.authorID ? (
              <Button
                variant="danger"
                id="deleteBtn"
                onClick={() => setDeleteConfirmation(true)}>
                {t('Delete')}
              </Button>
            ) : null}
          </Col>

          <Col xs={12} md={6}>
            {postLoaded ? (
              <ListGroup>
                <ListGroupItem>{t('Address')}: {post.address}</ListGroupItem>
                <ListGroupItem>
                  {t('Price')}: ${post.price} {t(post.paymentPeriod)}
                </ListGroupItem>
                {post.email !== "" && (
                  <ListGroupItem>{t('Email')}: {post.email}</ListGroupItem>
                )}
                <ListGroupItem>
                  {t(post.pets ? "Pets friendly" : "No pets")}
                </ListGroupItem>
                <ListGroupItem>
                  {t(post.utilities ? "Utility included" : "Utility not included")}
                </ListGroupItem>
                <ListGroupItem>
                  {t(post.laundry ? "Ensuite laundry" : "No ensuite laundry")}
                </ListGroupItem>
                <ListGroupItem>
                  {t(post.furnished ? "Furnished" : "Unfurnished")}
                </ListGroupItem>
                <Button
                  id="viewFullInfoBtn"
                  onClick={() => setShowFullInfo(true)}
                  variant="success">
                  {t('View More')}
                </Button>
              </ListGroup>
            ) : (
              <LoadingSpinner />
            )}
          </Col>

          <Col xs={12} md={6}>
            {mapLoaded ? (
              <ReactMapGL
                {...property}
                onViewportChange={(view) => setProperty(view)}>
                <Marker latitude={coords.latitude} longitude={coords.longitude}>
                  <span id="marker"></span>
                </Marker>
              </ReactMapGL>
            ) : (
              <LoadingSpinner />
            )}
          </Col>

          <Col id="comment">
            <h4 className="text-center">{t('Comment')}</h4>
            {postLoaded ? (
              comments.map((e) => (
                <div className="comment__block" key={e._id}>
                  <span className="commnet_userinfo">
                    <img
                      className="comment__img"
                      src={userLogo}
                      width="40"
                      alt="user_img"
                    />
                  </span>
                  <span className="comment--rightBlock">
                    <p className="comment--user">
                      <span className="comment--username">{e.username}</span>{" "}
                      &#8226; {e.date}
                    </p>
                    <p className="comment__content">{e.text}</p>
                  </span>
                  {user && post && user.userId === e.user ? (
                    <span>
                      <OverlayTrigger
                        placement="top"
                        overlay={renderCommentTooltip}>
                        <img
                          className="comment-editIcon"
                          src={editIcon}
                          data-id={e._id}
                          onClick={deleteComment}
                          alt="edit"
                        />
                      </OverlayTrigger>
                    </span>
                  ) : null}
                </div>
              ))
            ) : (
              <LoadingSpinner />
            )}
            <div className="comment__input">
              <form onSubmit={addComment}>
                <textarea
                  ref={commentRef}
                  name="newComment"
                  placeholder={t('Leave a comment!')}></textarea>
                <Button type="submit">{t('Submit')}</Button>
              </form>
            </div>
          </Col>

          {/* Schedule Modal */}
          {postLoaded && (
            <Modal
              show={displaySchedule}
              onHide={() => setDisplaySchedule(false)}
              centered>
              <Modal.Header closeButton>
                <Modal.Title>{t('You can contact the landlord on')}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ListGroup id="date-list-group">
                  {schedule.map((object) => (
                    <span className="date-list-item" key={object.id}>
                      <ListGroup.Item variant="primary">
                        <a
                          href={`mailto:${post.email}?subject=[VanHouse - ${post.address}] Request to schedule a home tour on ${object.date}`}>
                          {object.date}
                        </a>
                      </ListGroup.Item>
                    </span>
                  ))}
                </ListGroup>
              </Modal.Body>
            </Modal>
          )}

          {/* Report Modal */}
          <Report
            displayReport={displayReport}
            setDisplayReport={setDisplayReport}
          />

          {/* Full info modal */}
          {postLoaded && (
            <Modal
              show={showFullInfo}
              onHide={() => setShowFullInfo(false)}
              centered>
              <Modal.Header closeButton>
                <Modal.Title> {t('Full info')}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ListGroup>
                  <ListGroupItem> {t('Address')}: {post.address}</ListGroupItem>
                  <ListGroupItem>
                    {t('Price')}: ${post.price} {t(post.paymentPeriod)}
                  </ListGroupItem>
                  {post.email !== "" && (
                    <ListGroupItem> {t('Email')}: {post.email}</ListGroupItem>
                  )}
                  <ListGroupItem>
                    {t('Lease Length')}: {t(post.leaseLength)}
                  </ListGroupItem>
                  <ListGroupItem>
                    {t(post.pets ? "Pets friendly" : "No pets")}
                  </ListGroupItem>
                  <ListGroupItem>
                    {t(post.utilities
                      ? "Utility included"
                      : "Utility not included")}
                  </ListGroupItem>
                  <ListGroupItem>
                    {t(post.laundry ? "Ensuite laundry" : "No ensuite laundry")}
                  </ListGroupItem>
                  <ListGroupItem>
                    {t(post.furnished ? "Furnished" : "Not furnished")}
                  </ListGroupItem>
                  <ListGroupItem> {t('Bedroom')}: {post.bedrooms}</ListGroupItem>
                  <ListGroupItem> {t('Bathroom')}: {post.bathrooms}</ListGroupItem>
                  <ListGroupItem>{t('Square Feet')}: {post.sqft}</ListGroupItem>
                </ListGroup>
              </Modal.Body>
            </Modal>
          )}

          <EditPost
            show={displayEditModal}
            setDisplay={setDisplayEditModal}
            post={post}
            setPost={setPost}
          />
          {/* DELETE MODAL */}
          <Modal
            show={deleteConfirmation}
            onHide={() => setDeleteConfirmation(false)}
            centered>
            <Modal.Header closeButton>
              <Modal.Title>{t('Are you sure you want to continue?')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button variant="danger" onClick={deletePost}>
                {t('Delete')}
              </Button>
              <Button
                variant="primary"
                onClick={() => setDeleteConfirmation(false)}>
                {t('Cancel')}
              </Button>
            </Modal.Body>
          </Modal>
        </Row>
      </Container>
    </>
  );
}
