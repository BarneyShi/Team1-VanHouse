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
    setState(1);
    fetch("http://localhost:4000/getpost", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFilterPost(res);


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
