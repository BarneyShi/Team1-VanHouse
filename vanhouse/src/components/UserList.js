import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Accordion } from "react-bootstrap";
import user1 from "../assets/img1.jpg";
import user2 from "../assets/img2.jpg";
import user3 from "../assets/img3.jpg";
import user4 from "../assets/user.svg";
import triangle from "../assets/triangle.png";
import '../styles/userlist.css';

import event from './Events';


function UserList({ setQuery, setUserId }) {

    const [state, setState] = useState(0);
    const [userImg, setImg] = useState([user1, user2, user4]);
    const [list, setList] = useState();
    const [userSelected, setUserSelected] = useState("");

    event.addListener('clear_user', msg=>{
        setUserId("");
        let items = document.getElementsByClassName("user-item");
        for(let element of items){
            element.classList.remove("selected");
        }
    })

    function filterUserPost(e, item) {
        let items = document.getElementsByClassName("user-item");
        for(let element of items){
            element.classList.remove("selected");
        }
        e.target.classList.add("selected")
        setUserId(item._id);
        setUserSelected(item._id);
        const url = `/userpost/${item._id}`;
        setQuery(url);
    }
    function Cancel() {
        setUserId("");
        setQuery("");
    }

    let keyIndex = 0;
    useEffect(() => {
        fetch("/user",
            { method: "GET" })
            .then((res) => res.json())
            .then((res) => {
                const newName = [];
                console.log(res);
                keyIndex++;
                const cardList = res.map((item, index) => (
                    <div className="user-item" key={keyIndex + "_" + item._id}  onClick={(e) => filterUserPost(e, item)}>
                        <img alt="User avatar" src={userImg[2]} />
                        {item.firstName} {item.lastName}
                    </div>
                ));
                setList(cardList);
            });
    }, []);


    return (
        <div>

            <div className="user-box user_scroll_div d-none d-md-block">
                <div className="accordion" >
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0"  data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                User List
                            </h2>
                        </div>

                        <div>
                            <div className="card-body">
                                {list}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="d-block d-md-none">
                <div className="accordion" id="user-list">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0"  data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                User List
                                <img className="dropdown-img" alt="triangle" src={triangle} />
                            </h2>
                        </div>

                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#user-list">
                            <div className="card-body">
                                {list}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

UserList.propTypes = {
    setQuery: PropTypes.func.isRequired,
    setUserId: PropTypes.func.isRequired
};

export default UserList;
