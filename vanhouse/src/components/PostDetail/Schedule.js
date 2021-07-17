import React, { useState } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Schedule.css";

function Schedule({ show, onHide, handleSubmit }) {
  // CITATION: Modal https://react-bootstrap.github.io/components/modal/
  // CITATION: DatePicker https://www.npmjs.com/package/react-datepicker

  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState([]);

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
    setSelectedDate([
      ...selectedDate,
      { id: year + month + day, date: `${week} ${day} ${month} ${year}` },
    ]);
  };

  // Delete dates
  const deleteDate = (event) => {
    const dateToDelete = event.target.getAttribute("data-date");
    const updatedDatesArr = selectedDate.filter(
      (date) => date.date !== dateToDelete
    );
    setSelectedDate([...updatedDatesArr]);
  };

  const submitSchedule = () => {
    handleSubmit(selectedDate);
    onHide();
    setSelectedDate([]);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Your post has been published!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Now tell tenants when you&apos;re avaiable for a home tour!</p>
        <ListGroup id="date-list-group">
          {selectedDate.map((object) => (
            <span className="date-list-item" key={object.id}>
              <ListGroup.Item variant="primary">{object.date}</ListGroup.Item>
              <Button
                variant="danger"
                onClick={deleteDate}
                data-date={object.date}
              >
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
        />
        <p id="datepicker-text">You can pick multiple dates!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitSchedule}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

Schedule.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Schedule;
