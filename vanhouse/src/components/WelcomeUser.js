import React, {useEffect, useState} from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import PropTypes from "prop-types";
import "../styles/login.css"
import DropdownMenu from "react-bootstrap/DropdownMenu";

function WelcomeUser({
                         user,
                         isLoggedIn,
                         handleLogoutClicked
                     }) {

    return (
        <Dropdown>
            {isLoggedIn &&
            <div className="dropdown-stuff">
                <Dropdown.Toggle className="dropdown-toggle-button">
                    <span className="welcome-text">Hi, {user.name}!</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogoutClicked}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </div>
            }
        </Dropdown>
    )
}

WelcomeUser.defaultProps =
    {}

WelcomeUser.propTypes =
    {
        user: PropTypes.objectOf(PropTypes.object).isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        handleLogoutClicked: PropTypes.bool.isRequired
    };

export default WelcomeUser
