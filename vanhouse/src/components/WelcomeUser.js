import React, {useEffect} from "react";
import {Dropdown} from "react-bootstrap";
import PropTypes from "prop-types";
import "../styles/header.css"

function WelcomeUser({
                         user,
                         setUser,
                         handleLogoutClicked,
                         handleAccountClicked,
                     }) {

    const loggedInCondRender = () => {
        fetch('http://localhost:4000/login-router/account', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then((response) => {
            response.json()
                .then((resJSON => {
                    setUser({
                        userId: resJSON.userId,
                        email: resJSON.email,
                        firstName: resJSON.firstName,
                        lastName: resJSON.lastName,
                        admin: resJSON.admin
                    });
                }))
                .catch(() => {
                    setUser(null);
                })
        }).catch(() => {
            setUser(null);
        });
    }

    useEffect(() => {
        loggedInCondRender();
    });

    if (user === null) {
        return (
            <h2>

            </h2>
        )
    }

    return (
        <div className="welcome-user-div">
            <Dropdown>
                <Dropdown.Toggle variant="outline-success">
                    <span>Hi, {user.firstName}!</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleAccountClicked}>Account</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogoutClicked}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>

    )
}

WelcomeUser.defaultProps =
    {}

WelcomeUser.propTypes =
    {
        user: PropTypes.shape({firstName: PropTypes.string}),
        setUser: PropTypes.func,
        handleLogoutClicked: PropTypes.func.isRequired,
        handleAccountClicked: PropTypes.func.isRequired,
    };

export default WelcomeUser
