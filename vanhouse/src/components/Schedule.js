import { Modal, Button } from "react-bootstrap";
export default function Schedule({ show, onHide }) {
  // CITATION: https://react-bootstrap.github.io/components/modal/
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Schedule a time for a home tour!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tell tenants when you're avaiable for a home tour!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
