import { useState } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Schedule.css";

export default function Schedule({ show, onHide }) {
  // CITATION: Modal https://react-bootstrap.github.io/components/modal/
  // CITATION: DatePicker https://www.npmjs.com/package/react-datepicker

  const [startDate, setStartDate] = useState(new Date());
  let [selectedDate, setSelectedDate] = useState([]);

  // Select multi dates
  const addDate = (date) => {
    const dayOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthOfYear = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const week = dayOfWeek[date.getDay()];
    const day = date.getDate();
    const month = monthOfYear[date.getMonth()];
    const year = date.getFullYear();
    const result = `${week} ${day} ${month} ${year}`;

    if (selectedDate.includes(result)) return;
    setSelectedDate([...selectedDate, `${week} ${day} ${month} ${year}`]);
  };

  // Delete dates
  const deleteDate = (event) => {
    const dateToDelete = event.target.getAttribute("data-date");
    const updatedDatesArr = selectedDate.filter(
      (date) => date !== dateToDelete
    );
    setSelectedDate([...updatedDatesArr]);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Schedule a time for a home tour!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tell tenants when you're avaiable for a home tour!</p>
        <ListGroup id="date-list-group">
          {selectedDate.map((date, index) => (
            <span className="date-list-item" key={index}>
              <ListGroup.Item variant="primary">{date}</ListGroup.Item>
              <Button variant="danger" onClick={deleteDate} data-date={date}>
                Delete
              </Button>
            </span>
          ))}
        </ListGroup>

        <DatePicker
          id="datePicker"
          dateFormat="MMM dd yyyy"
          minDate={new Date()}
          selected={startDate}
          onChange={(date) => {
            addDate(date);
            setStartDate(date);
          }}
          shouldCloseOnSelect={false}
        />
        <p id="datepicker-text">You can pick multiple dates!</p>
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
