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
            <Dropdown.Toggle className="dropdown-toggle">
                <div className="welcome-user-inner-div">
                    {isLoggedIn &&
                    <span className="welcome-text">Hi, {user.name}!</span>
                    }
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogoutClicked}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

WelcomeUser.defaultProps = {}

WelcomeUser.propTypes = {
    user: PropTypes.objectOf(PropTypes.object).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    handleLogoutClicked: PropTypes.bool.isRequired
};

export default WelcomeUser
