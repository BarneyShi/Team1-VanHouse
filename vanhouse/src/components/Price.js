import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/searchbar.css";
import UserList from "./UserList";

function Price({ setFilterPost, setFilterIdx }) {
  const [state, setState] = useState(0);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);


  function Cancel() {

    fetch("http://localhost:4000/getpost", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFilterPost(res);
    setState(1);

      });
  }

  function getP() {
    // const rr = [];
    // storePost.forEach((item) => {
    //   if (item.price >= low && item.price <= high) {
    //     rr.push(item);
    //   }
    // });


    fetch(`http://localhost:4000/price?low=${low}&high=${high}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        // setPosts(res);
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
                value={low}
                onChange={(e) => {
                  setLow(Number(e.target.value));
                }}
              />
            </td>
            <td>-</td>
            <td>
              <input
                type="text"
                value={high}
                onChange={(e) => {
                  setHigh(Number(e.target.value));
                }}
              />
            </td>
          </tr>
        </table>
        <div className="divStyle">
          <Button variant="primary" onClick={() => getP(low, high)}>
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

Price.propTypes = {
  // filterPost: PropTypes.instanceOf(Array).isRequired,
  setFilterPost: PropTypes.func.isRequired,
  setFilterIdx: PropTypes.func.isRequired,
};
export default Price;
