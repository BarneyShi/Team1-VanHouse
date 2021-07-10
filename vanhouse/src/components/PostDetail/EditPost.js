import React from "react";
import PropTypes from "prop-types";
import { Form, Modal, Col, Row, Button } from "react-bootstrap";

export default function EditPost({ show, setDisplay, post }) {
  return (
    <Modal show={show} onHide={() => setDisplay(false)}>
      <Form>
        <Modal.Header>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="Title" defaultValue={post?.title} />
          </Form.Group>

          <Row>
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>Email address *</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                defaultValue={post?.email}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="123-456-7890"
                defaultValue={post?.phone}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formAddress">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                required
                placeholder="1961 East Mall"
                defaultValue={post?.address}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="form">
              <Form.Label>Postal Code *</Form.Label>
              <Form.Control
                required
                placeholder="A1B 2C3"
                pattern="[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]"
                defaultValue={post?.postalCode}
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
                defaultValue={post?.price}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formPricePeriod">
              <Form.Label> Payment period </Form.Label>
              <Form.Control as="select" defaultValue={post?.paymentPeriod}>
                <option>daily</option>
                <option>weekly</option>
                <option>monthly</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formLease">
              <Form.Label>Lease length</Form.Label>
              <Form.Control as="select" defaultValue={post?.leaseLength}>
                <option>no lease</option>
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
                  defaultValue={post?.bedrooms}
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
                  defaultValue={post?.bathrooms}
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
                  defaultValue={post?.sqft}
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
                  defaultChecked={post?.utilities}
                />
              </Form.Group>

              <Form.Group controlId="formPets">
                <Form.Check
                  type="checkbox"
                  label="Pets allowed"
                  defaultChecked={post?.pets}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLaundry">
                <Form.Check
                  type="checkbox"
                  label="In suite laundry"
                  defaultChecked={post?.laundry}
                />
              </Form.Group>
              <Form.Group controlId="formFurnished">
                <Form.Check
                  type="checkbox"
                  label="Furnished"
                  defaultChecked={post?.furnished}
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
  post: PropTypes.shape({
    title: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    postalCode: PropTypes.string,
    price: PropTypes.string,
    paymentPeriod: PropTypes.string,
    bedrooms: PropTypes.string,
    bathrooms: PropTypes.string,
    sqft: PropTypes.string,
    leaseLength: PropTypes.string,
    pets: PropTypes.bool,
    utilities: PropTypes.bool,
    laundry: PropTypes.bool,
    furnished: PropTypes.bool,
  }).isRequired,
};
