import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/searchbar.css";
import UserList from "./UserList";

function Location({ setFilterIdx, setFilterPost }) {
  const [state, setState] = useState(0);


  function Cancel() {
    setState(1);

    fetch("http://localhost:4000/getpost", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFilterPost(res);


      });
  }

  function getByLocation(val) {
    console.log(val);
    const url =`http://localhost:4000/location/${val}`;
    fetch(url, {
      method: "GET"
    })
      .then((res) => {
        console.log(res);
        // console.log(res.json());
        return res.json();
      })
      .then((res) => {
        // setPosts(res);
        console.log(res);
        setFilterPost(res);
      });
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

  return <UserList setFilterPost={setFilterPost} />;
}
Location.propTypes = {
  setFilterPost: PropTypes.func.isRequired,
  setFilterIdx: PropTypes.func.isRequired,
};
export default Location;
