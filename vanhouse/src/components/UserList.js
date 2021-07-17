import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import user1 from "../assets/img1.jpg";
import user2 from "../assets/img2.jpg";
import user3 from "../assets/img3.jpg";
import user4 from "../assets/user.svg";

function UserList({ setQuery }) {

    const [state, setState] = useState(0);

    const [userImg, setImg] = useState([user1, user2, user4]);

    const [list, setList] = useState();

    function filterUserPost(item) {
        const url = `http://localhost:4000/userpost/${item._id}`;
        setQuery(url);
    }
    function Cancel() {
        setQuery("");
    }

    useEffect(() => {
        fetch("http://localhost:4000/user",
            { method: "GET" })
            .then((res) => res.json())
            .then((res) => {
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
                                <img style={style} alt="User avatar" src={userImg[2]} />
                            </div>
                            <button type="button" style={{ fontSize: "20px", outline: "none", border: 'none' }}

                                    onClick={() => filterUserPost(item)}>
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

            <div style={{ display: "flex" }}>
                <button type="button" style={  { marginLeft: "auto" }}
                    onClick={Cancel}
                >
                    Cancel
                </button>
            </div>

        </div>

    );


}

UserList.propTypes = {
    setQuery: PropTypes.func.isRequired,
};

export default UserList;
