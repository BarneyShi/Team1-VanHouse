import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/searchbar.css";
import UserList from "./UserList";

function Category({ setFilterPost, setFilterIdx }) {
  const [state, setState] = useState(0);
  const [lowPrice, setLow] = useState(0);
  const [highPrice, setHigh] = useState(0);
  const [loca, setLoca] = useState("");
  const v = [
    "V5K",
    "V5L",
    "V5M",
    "V5N",
    "V5P",
    "V5R",
    "V5S",
    "V5T",
    "V5V",
    "V5W",
    "V5X",
    "V5Y",
    "V5Z",
    "V6A",
    "V6B",
    "V6C",
    "V6E",
    "V6G",
    "V6H",
    "V6J",
    "V6K",
    "V6L",
    "V6M",
    "V6N",
    "V6P",
    "V6R",
    "V6S",
    "V6T",
    "V6Z",
    "V6X",
    "V6Y",
    "V7X",
    "V7Y",
  ];
  const l = ["V6V", "V6W", "V6X", "V6Y", "V7A", "V7B", "V7C", "V7E"];
  const b = [
    "V3J",
    "V3N",
    "V5A",
    "V5B",
    "V5C",
    "V5E",
    "V5G",
    "V5H",
    "V5J",
    "V5K",
  ];

  function getByLocationAndPrice() {
    const url = `http://localhost:4000/category?low=${lowPrice}&high=${highPrice}&location=${loca}`;
    fetch(url, {
      method: "GET",
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

  function Cancel() {

    fetch("http://localhost:4000/getpost", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFilterPost(res);
    setState(1);

      });
  }

  if (state === 0) {
    return (
      <div className="boxStyle">
        <h2 className="h2">Price:</h2>
        <table id="table">
          <tr>
            <td>from</td>
            <td></td>
            <td>to</td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                value={lowPrice}
                onChange={(e) => {
                  setLow(e.target.value);
                }}
              />
            </td>
            <td>-</td>
            <td>
              <input
                type="text"
                value={highPrice}
                onChange={(e) => {
                  setHigh(e.target.value);
                }}
              />
            </td>
          </tr>
        </table>

        <h2 className="h2">Location:</h2>
        <Button
          className="width"
          bsStyle="primary"
          block
          onClick={(e) => {
            setLoca(e.target.innerText);
          }}
        >
          Vancouver
        </Button>
        <Button
          className="width"
          bsStyle="primary"
          block
          onClick={(e) => {
            setLoca(e.target.innerText);
          }}
        >
          Richmond
        </Button>
        <Button
          className="width"
          bsStyle="primary"
          block
          onClick={(e) => {
            setLoca(e.target.innerText);
          }}
        >
          Burnaby
        </Button>
        <div className="divStyle">
          <Button variant="primary" onClick={getByLocationAndPrice}>
            Submit
          </Button>
          <Button variant="primary" onClick={Cancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return <UserList setFilterPost={setFilterPost} />;
}
Category.propTypes = {
  setFilterPost: PropTypes.func.isRequired,
  setFilterIdx: PropTypes.func.isRequired,
};

export default Category;
