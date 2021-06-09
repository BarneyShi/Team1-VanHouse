import { Fragment, useState } from "react";
import {
  Carousel,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import ReactMapGL, { Marker } from "react-map-gl";
import userLogo from "../assets/user.svg";
import thumbUp from "../assets/thumb-up.svg";
import thumbDown from "../assets/thumb-down.svg";
import upVote from "../assets/thumbup-voted.svg";
import downVote from "../assets/thumbdown-voted.svg";

export default function PostDetail() {
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

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100 post-detail-thumbnail"
                  src="https://customhomesottawa.ca/wp-content/uploads/2016/05/placeholder-house1.jpg"
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
                Address: 1234 W 14th Ave, Vancouver, BC V2R 1R2
              </ListGroupItem>
              <ListGroupItem>Price: $1000</ListGroupItem>
              <ListGroupItem>Lease Length: 12 months</ListGroupItem>
              <ListGroupItem>No Pets</ListGroupItem>
              <ListGroupItem>Less Cooking</ListGroupItem>
              <ListGroupItem>Unitily Included</ListGroupItem>
              <ListGroupItem>Laundry</ListGroupItem>
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
            <div className="comment__block">
              <span className="commnet_userinfo">
                <img
                  className="comment__img"
                  src={userLogo}
                  width="40"
                  alt="user_img"
                />
                <span className="comment__username">Anon1</span>
              </span>
              <p className="comment__content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </p>
            </div>

            <div className="comment__block">
              <span className="commnet_userinfo">
                <img
                  className="comment__img"
                  src={userLogo}
                  width="40"
                  alt="user_img"
                />
                <span className="comment__username">Anon2</span>
              </span>
              <p className="comment__content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </p>
            </div>

            <div className="comment__block">
              <span className="commnet_userinfo">
                <img
                  className="comment__img"
                  src={userLogo}
                  width="40"
                  alt="user_img"
                />
                <span className="comment__username">Anon3</span>
              </span>
              <p className="comment__content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </p>
            </div>

            <div className="comment__block">
              <span className="commnet_userinfo">
                <img
                  className="comment__img"
                  src={userLogo}
                  width="40"
                  alt="user_img"
                />
                <span className="comment__username">Anon</span>
              </span>
              <p className="comment__content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </p>
            </div>

            <div className="comment__block">
              <span className="commnet_userinfo">
                <img
                  className="comment__img"
                  src={userLogo}
                  width="40"
                  alt="user_img"
                />
                <span className="comment__username">Anon</span>
              </span>
              <p className="comment__content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </p>
            </div>

            <div className="comment__input">
              <form>
                <textarea placeholder="Give us comment!"></textarea>
                <Button>Submit</Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
