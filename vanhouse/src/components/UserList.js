import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import user1 from "../assets/img1.jpg";
import user2 from "../assets/img2.jpg";
import user3 from "../assets/img3.jpg";

function UserList({ setFilterPost }) {

  const [userimg, setImg] = useState([user1, user2, user3]);
  const [list, setList] = useState();
  function filterUserPost(item) {
    const url = `http://localhost:4000/userpost/${item.id}`;
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


  useEffect(() => {
    console.log("hahhahahhahah");
    fetch("http://localhost:4000/user",
     { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        console.log("ddddddd");
        const newName = [];
        console.log(res);
        const cardList = res.map((item, index) => {
          const style = {
            width: "35px",
            height: "35px",
            borderRadius: "100%",
          };
          const ButtonStyle = {
            display: "flex",
            alignItems: "center",
          };
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
              key={item}
            >
              <div>
                <img style={style} alt="User avatar" src={userimg[0]} />
              </div>
              <button type="button" style={{ fontSize: "20px", outline: "none", border: 'none' }} onClick={() => filterUserPost(item)}>
                {item.firstName} {item.lastName}
              </button>
            </div>
          );
        });
        setList(cardList);
      });
  }, []);

  const boxStyle = {
    boxShadow: "0 8px 20px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.1)",
    borderRadius: "3px",
    paddingBottom: "10px",
    height: "86vh",
  };

  return (
    <div style={boxStyle}>
      <h2>User List</h2>
      <Container fluid>{list}</Container>
    </div>
  );
}

UserList.propTypes = {
  setFilterPost: PropTypes.func.isRequired,
};

export default UserList;
