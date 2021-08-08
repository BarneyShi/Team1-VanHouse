/* CITATION:  I used the following reference to learn how to create a modal popup with bootstrap:
              https://react-bootstrap.github.io/components/modal/
   CITATION:  I used the following reference for the phone number format:
              https://www.w3schools.com/tags/att_input_type_tel.asp
   CITATION: I learned the FileReader approach to uploading images from https://stackoverflow.com/a/43992687
*/

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import Schedule from "./PostDetail/Schedule";
import ImagePrep from "./ImagePrep";

// Presents a modal view with a form for creating a new post
function NewPost({ showModalForm, submit, handleClose }) {
  // States set by form inputs
  const [postTitle, setPostTitle] = useState("Untitled Post");
  const [price, setPrice] = useState(0);
  const [paymentPeriod, setPaymentPeriod] = useState("monthly");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [lease, setLease] = useState(0);
  const [bedrooms, setBedrooms] = useState(-1);
  const [bathrooms, setBathrooms] = useState(-1);
  const [squareFootage, setSquareFootage] = useState(-1);
  const [utilities, setUtilities] = useState(false);
  const [pets, setPets] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");

  // Hook for displaying <Schedule /> and <ImagePrep />
  const [displaySchedule, setDisplaySchedule] = useState(false);
  const [displayImagePrep, setDisplayImagePrep] = useState(false);

  const [executing, setExecuting] = useState(false);
  const { t, i18n } = useTranslation();
  
  // Resets form states
  const resetStates = (show) => {
    if (show) {
      setPostTitle("Untitled Post");
      setPrice(0);
      setPaymentPeriod("monthly");
      setEmail("");
      setPhone("");
      setAddress("");
      setPostalCode("");
      setLease(0);
      setBedrooms(0);
      setBathrooms(0);
      setSquareFootage(0);
      setUtilities(false);
      setPets(false);
      setLaundry(false);
      setFurnished(false);
      setImages([]);
      setMainImage("");
    }
  };

  // Reset the form input states whenever the modal view is presented
  useEffect(() => {
    resetStates(showModalForm);
  }, [showModalForm]);


  // Continue button callback, present <ImagePrep />
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayImagePrep(true);
    handleClose();
  };

  // ImagePrep continue button callback, present <Schedule />
  const handleImageSubmit = (imgs, mainImg) => {
    setImages(imgs);
    setMainImage(mainImg);
    setDisplaySchedule(true);
  }

  // Create a new post object using states as params and call the submit callback prop
  // This will make the PostCollection component POST the new rental listing to the server
  const handleScheduleSubmit = async (schedule) => {
    setExecuting(true);
    const res = await submit({
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
      mainImage,
      schedule,
    });
    setExecuting(false);
    setDisplaySchedule(false);
  };

  return (
    <div>
      <Modal show={showModalForm} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>{t('Create a new rental listing')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Col} controlId="formTitle">
              <Form.Label>{t('Title')}</Form.Label>
              <Form.Control
                placeholder={t('Title')}
                onChange={(e) => {
                  setPostTitle(e.target.value);
                }}
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col} controlId="formEmail">
                <Form.Label>{t('Email address')} *</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="sample@sample.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formPhone">
                <Form.Label>{t('Phone number')}</Form.Label>
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
                <Form.Label>{t('Address')} *</Form.Label>
                <Form.Control
                  required
                  placeholder="1961 East Mall"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="form">
                <Form.Label>{t('Postal Code')} *</Form.Label>
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
                <Form.Label>{t('Price')} *</Form.Label>
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
                <Form.Label> {t('Payment period')} </Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="monthly"
                  onChange={(e) => {
                    const periods = ["daily", "weekly", "monthly"];
                    setPaymentPeriod(periods[e.target.selectedIndex]);
                  }}>
                  <option>{t('daily')}</option>
                  <option>{t('weekly')}</option>
                  <option>{t('monthly')}</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formLease">
                <Form.Label>{t('Lease length')}</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    setLease(e.target.selectedIndex * 6);
                  }}>
                  <option>{t('no lease')}</option>
                  <option>6 {t('months')}</option>
                  <option>1 {t('year')}</option>
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formBedrooms">
                  <Form.Label>{t('Bedrooms')}</Form.Label>
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
                  <Form.Label>{t('Bathrooms')}</Form.Label>
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
                  <Form.Label>{t('Square ft')}</Form.Label>
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
                    label={t('Utilities included')}
                    onChange={(e) => {
                      setUtilities(e.target.value === "on");
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formPets">
                  <Form.Check
                    type="checkbox"
                    label={t('Pets allowed')}
                    onChange={(e) => {
                      setPets(e.target.value === "on");
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formLaundry">
                  <Form.Check
                    type="checkbox"
                    label={t('In suite laundry')}
                    onChange={(e) => {
                      setLaundry(e.target.value === "on");
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formFurnished">
                  <Form.Check
                    type="checkbox"
                    label={t('Furnished')}
                    onChange={(e) => {
                      setFurnished(e.target.value === "on");
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Text className="text-muted">* {t('required fields')}</Form.Text>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t('Close')}
            </Button>
            <Button variant="primary" type="submit">
              {t('Continue')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ImagePrep
        show={displayImagePrep}
        handleClose={() => {setDisplayImagePrep(false)}}
        handleSubmit={handleImageSubmit}
      />
      <Schedule
        show={displaySchedule}
        onHide={() => {setDisplaySchedule(false);}}
        handleSubmit={handleScheduleSubmit}
        executing={executing}
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
