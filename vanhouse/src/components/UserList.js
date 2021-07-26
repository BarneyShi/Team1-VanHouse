import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import user1 from "../assets/img1.jpg";
import user2 from "../assets/img2.jpg";
import user3 from "../assets/img3.jpg";
import user4 from "../assets/user.svg";
import '../styles/userlist.css';


function UserList({ setQuery, setUserId }) {

    const [state, setState] = useState(0);
    const [userImg, setImg] = useState([user1, user2, user4]);
    const [list, setList] = useState();

    function filterUserPost(item) {
        setUserId(item._id);
        const url = `http://localhost:4000/userpost/${item._id}`;
        setQuery(url);
    }
    function Cancel() {
        setUserId("");
        setQuery("");
    }

    useEffect(() => {
        fetch("http://localhost:4000/user",
            { method: "GET" })
            .then((res) => res.json())
            .then((res) => {
                const newName = [];
                console.log(res);
                const cardList = res.map((item, index) => (
                    <div className="user-item" key={item} >
                        <img alt="User avatar" src={userImg[2]} />
                        <button type="button" onClick={() => filterUserPost(item)}>
                            {item.firstName} {item.lastName}
                        </button>
                    </div>
                ));
                setList(cardList);
            });
    }, []);


    return (
        <div className="user-box">
            <h2>User List</h2>
            <Container fluid>{list}</Container>

            <div className="cancel-btn">
                <button type="button" onClick={Cancel}>Cancel</button>
            </div>
        </div>
    );


}

UserList.propTypes = {
    setQuery: PropTypes.func.isRequired,
    setUserId: PropTypes.func.isRequired
};

export default UserList;
