/* CITATION:  I used the following reference to learn how to create a modal popup with bootstrap: 
              https://react-bootstrap.github.io/components/modal/
   CITATION:  I used the following reference for the phone number format: 
              https://www.w3schools.com/tags/att_input_type_tel.asp
*/

// TODO - handle uploading images
// TODO - handle updating state for all form elements and pass all data to PostCollection

import { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap";

// Presents a modal view with a form for creating a new post
function NewPost(props) {
  // States set by form inputs
  const [title, setTitle] = useState("Untitled Post");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [lease, setLease] = useState("No lease");

  // Create a post object with the form details and send this to the 
  // PostCollection component using the callback
  const handleSubmit = (e) => {
    e.preventDefault();
    props.submit({"postTitle": title, 
                  "email": email, 
                  "address": address});
    props.handleClose();
  }

  return (
    <Modal show={props.show} onHide={props.handleClose} animation={false}>
      <Form onSubmit={handleSubmit}>
      <Modal.Header>
        <Modal.Title>Create a new rental listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control placeholder="Title" onChange={(e) => {setTitle(e.target.value)}}/>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address *</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" onChange={(e) => {setEmail(e.target.value)}}/>
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" onChange={(e) => {setPhone(e.target.value)}}/>
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address *</Form.Label>
          <Form.Control required placeholder="1961 East Mall" onChange={(e) => {setAddress(e.target.value)}}/>
        </Form.Group>

        <Form.Group controlId="formLease">
          <Form.Label>Lease length</Form.Label>
          <Form.Control as="select" defaultValue="No lease" onChange={(e) => {setLease(e.target.value)}}>
            <option>No lease</option>
            <option>6 months</option>
            <option>1 year</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formPets">
          <Form.Check type="checkbox" label="Pets allowed" />
        </Form.Group>

        <Form.Group controlId="formUtilities">
          <Form.Check type="checkbox" label="Utilities included" />
        </Form.Group>

        <Form.Group controlId="formLaundry">
          <Form.Check type="checkbox" label="In suite laundry" />
        </Form.Group>

        <Form.Group controlId="formImages">
          <Form.File id="uploadImagesButton" multiple label="Upload image(s)" accept=".jpg, .jpeg, .png, .tiff" />
        </Form.Group>

        <Form.Text className="text-muted">
          * required fields
        </Form.Text>
      
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit">
          Post
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default NewPost;