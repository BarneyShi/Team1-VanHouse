import React from "react";
import PropTypes from "prop-types";
import { Form, Modal, Col, Row, Button } from "react-bootstrap";

export default function EditPost({ show, setDisplay, post }) {
  return (
    <Modal show={show} onHide={() => setDisplay(false)}>
      <Form>
        <Modal.Header>
          <Modal.Title>Create a new rental listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="Title" />
          </Form.Group>

          <Row>
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>Email address *</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="123-456-7890"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formAddress">
              <Form.Label>Address *</Form.Label>
              <Form.Control required placeholder="1961 East Mall" />
            </Form.Group>
            <Form.Group as={Col} controlId="form">
              <Form.Label>Postal Code *</Form.Label>
              <Form.Control
                required
                placeholder="A1B 2C3"
                pattern="[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formPrice">
              <Form.Label>Price *</Form.Label>
              <Form.Control required type="number" min="0" placeholder="1000" />
            </Form.Group>

            <Form.Group as={Col} controlId="formPricePeriod">
              <Form.Label> Payment period </Form.Label>
              <Form.Control as="select" defaultValue="Monthly">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formLease">
              <Form.Label>Lease length</Form.Label>
              <Form.Control as="select" defaultValue="No lease">
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
                <Form.Control type="number" min="0" placeholder="1" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBathrooms">
                <Form.Label>Bathrooms</Form.Label>
                <Form.Control type="number" min="0" placeholder="1" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formSqft">
                <Form.Label>Square ft</Form.Label>
                <Form.Control type="number" min="0" placeholder="500" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formUtilities">
                <Form.Check type="checkbox" label="Utilities included" />
              </Form.Group>

              <Form.Group controlId="formPets">
                <Form.Check type="checkbox" label="Pets allowed" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLaundry">
                <Form.Check type="checkbox" label="In suite laundry" />
              </Form.Group>
              <Form.Group controlId="formFurnished">
                <Form.Check type="checkbox" label="Furnished" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group as={Col} controlId="formImages">
            <Form.File
              id="uploadImagesButton"
              multiple
              label="Upload image(s)"
              accept=".jpg, .jpeg, .png, .tiff"
            />
          </Form.Group>

          <Form.Text className="text-muted">* required fields</Form.Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDisplay(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Continue
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

EditPost.propTypes = {
  show: PropTypes.bool.isRequired,
  setDisplay: PropTypes.func.isRequired,
  post: PropTypes.shape({}).isRequired,
};
