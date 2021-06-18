import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Schedule({ show, onHide }) {
  // CITATION: Modal https://react-bootstrap.github.io/components/modal/
  // CITATION: DatePicker https://www.npmjs.com/package/react-datepicker

  const [startDate, setStartDate] = useState(new Date());
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Schedule a time for a home tour!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tell tenants when you're avaiable for a home tour!</p>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            console.log(date);
            setStartDate(date);
          }}
          dateFormat="MMM dd yyyy"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

Schedule.prototype = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
