/* CITATION:  I used the following reference to learn how to create a modal popup with bootstrap:
              https://react-bootstrap.github.io/components/modal/
   CITATION:  I used the following reference for the phone number format:
              https://www.w3schools.com/tags/att_input_type_tel.asp
   CITATION: I learned the FileReader approach to uploading images from https://stackoverflow.com/a/43992687
*/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Schedule from "./Schedule";

// Presents a modal view with a form for creating a new post
function NewPost({ showModalForm, submit, handleClose }) {
  // States set by form inputs
  const [postTitle, setPostTitle] = useState("Untitled Post");
  const [price, setPrice] = useState(0);
  const [paymentPeriod, setPaymentPeriod] = useState("Monthly");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [lease, setLease] = useState("No lease");
  const [bedrooms, setBedrooms] = useState(-1);
  const [bathrooms, setBathrooms] = useState(-1);
  const [squareFootage, setSquareFootage] = useState(-1);
  const [utilities, setUtilities] = useState(false);
  const [pets, setPets] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [images, setImages] = useState([]);

  // Hooks for displaying <Schedule />
  const [displaySchedule, setDisplaySchedule] = useState(false);

  // Resets the states
  const resetStates = (show) => {
    if (show) {
      setPostTitle("Untitled Post");
      setPrice(0);
      setPaymentPeriod("Monthly");
      setEmail("");
      setPhone("");
      setAddress("");
      setPostalCode("");
      setLease("No lease");
      setBedrooms(-1);
      setBathrooms(-1);
      setSquareFootage(-1);
      setUtilities(false);
      setPets(false);
      setLaundry(false);
      setFurnished(false);
      setImages([]);
    }
  }

  // Reset the states whenever the modal view is presented
  useEffect(() => {
    resetStates(showModalForm);
  }, [showModalForm])

  // Create a post object with the form details and send this to the
  // PostCollection component using the callback
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplaySchedule(true);
    handleClose();
  };

  const handleScheduleSubmit = (schedule) => {
    submit({
      postTitle,
      price,
      paymentPeriod,
      email,
      phone,
      address,
      postalCode,
      lease,
      bedrooms,
      bathrooms,
      squareFootage,
      utilities,
      pets,
      laundry,
      furnished,
      images,
      schedule,
    });
  }

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const imageList = [];
      for (let i = 0; i < e.target.files.length; i += 1) {
        if (e.target.files[i]) {
          const fileReader = new FileReader();
          fileReader.onload = (event) => {
            imageList.push(event.target.result);
            setImages(imageList);
          };
          fileReader.readAsDataURL(e.target.files[i]);
        }
      }
    }
  };

  return (
    <div>
    <Modal show={showModalForm} onHide={handleClose} animation={false}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Create a new rental listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Title"
              onChange={(e) => {
                setPostTitle(e.target.value);
              }}
            />
          </Form.Group>

          <Row>
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>Email address *</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="123-456-7890"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formAddress">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                required
                placeholder="1961 East Mall"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="form">
              <Form.Label>Postal Code *</Form.Label>
              <Form.Control
                required
                placeholder="A1B 2C3"
                pattern="[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]"
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formPrice">
              <Form.Label>Price *</Form.Label>
              <Form.Control
                required
                type="number"
                min="0"
                placeholder="1000"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formPricePeriod">
              <Form.Label> Payment period </Form.Label>
              <Form.Control
                as="select"
                defaultValue="Monthly"
                onChange={(e) => {
                  setPaymentPeriod(e.target.value);
                }}
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formLease">
              <Form.Label>Lease length</Form.Label>
              <Form.Control
                as="select"
                defaultValue="No lease"
                onChange={(e) => {
                  setLease(e.target.value);
                }}
              >
                <option>No lease</option>
                <option>6 months</option>
                <option>1 year</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formBedrooms">
                <Form.Label>Bedrooms</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="1"
                  onChange={(e) => {
                    setBedrooms(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBathrooms">
                <Form.Label>Bathrooms</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="1"
                  onChange={(e) => {
                    setBathrooms(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formSqft">
                <Form.Label>Square ft</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="500"
                  onChange={(e) => {
                    setSquareFootage(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formUtilities">
                <Form.Check
                  type="checkbox"
                  label="Utilities included"
                  onChange={(e) => {
                    setUtilities(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formPets">
                <Form.Check
                  type="checkbox"
                  label="Pets allowed"
                  onChange={(e) => {
                    setPets(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLaundry">
                <Form.Check
                  type="checkbox"
                  label="In suite laundry"
                  onChange={(e) => {
                    setLaundry(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formFurnished">
                <Form.Check
                  type="checkbox"
                  label="Furnished"
                  onChange={(e) => {
                    setFurnished(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group as={Col} controlId="formImages">
            <Form.File
              id="uploadImagesButton"
              multiple
              label="Upload image(s)"
              accept=".jpg, .jpeg, .png, .tiff"
              onChange={(e) => {
                handleImageUpload(e);
              }}
            />
          </Form.Group>

          <Form.Text className="text-muted">* required fields</Form.Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Continue
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    <Schedule
        show={displaySchedule}
        onHide={() => setDisplaySchedule(false)}
        handleSubmit={handleScheduleSubmit}
      />
    </div>
  );
}

NewPost.propTypes = {
  showModalForm: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default NewPost;
