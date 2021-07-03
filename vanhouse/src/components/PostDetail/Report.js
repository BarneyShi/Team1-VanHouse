import React from "react";
import { Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";

export default function Report({ displayReport, setDisplayReport }) {
  return (
    <Modal show={displayReport} onHide={() => setDisplayReport(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Report Inappropriate or Violation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check type="checkbox" label="Spam or missleading content" />
          <Form.Check type="checkbox" label="Scam or impersonation to scam" />
          <Form.Check
            type="checkbox"
            label="Inappropriate name, image, or content"
          />
          <Form.Check type="checkbox" label="Other" />
        </Form>
      </Modal.Body>
    </Modal>
  );
}

Report.propTypes = {
  displayReport: PropTypes.bool.isRequired,
  setDisplayReport: PropTypes.func.isRequired,
};
