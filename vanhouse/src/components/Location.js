import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/searchbar.css";
import UserList from "./UserList";

function Location({ setQuery }) {
  const [state, setState] = useState(0);


  function Cancel() {
    setState(1);
    setQuery("");
  }

  function getByLocation(val) {
    const url =`http://localhost:4000/location/${val}`;
    setQuery(url);
  }

  if (state === 0) {
    return (
      <div className="boxStyle">
        <h2 className="h2">Location:</h2>
        <Button
          className="width"
          bsStyle="primary"
          block
          onClick={(e) => {
            getByLocation(e.target.innerHTML);
          }}
        >
          Vancouver
        </Button>
        <Button
          className="width"
          bsStyle="primary"
          block
          onClick={(e) => {
            getByLocation(e.target.innerHTML);
          }}
        >
          Richmond
        </Button>
        <Button
          className="width"
          bsStyle="primary"
          block
          onClick={(e) => {
            getByLocation(e.target.innerHTML);
          }}
        >
          Burnaby
        </Button>
        <div className="divStyle">
          <Button bsStyle="primary" onClick={Cancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return <UserList setQuery={setQuery} />;
}
Location.propTypes = {
  setQuery: PropTypes.func.isRequired
};
export default Location;
