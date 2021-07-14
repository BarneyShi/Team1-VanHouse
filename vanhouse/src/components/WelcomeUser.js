import React from "react";
import {Dropdown} from "react-bootstrap";
import PropTypes from "prop-types";
import "../styles/login.css"

function WelcomeUser({
                         user,
                         isLoggedIn,
                         handleLogoutClicked
                     }) {

    if (user === null) {
        return (
            <h2>

            </h2>
        )
    }
    return (
        <Dropdown>
            <div className="dropdown-stuff">
                <Dropdown.Toggle className="dropdown-toggle-button" variant="outline-success">
                    <span className="welcome-text">Hi, {user.firstName}!</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogoutClicked}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </div>
        </Dropdown>
    )
}

WelcomeUser.defaultProps =
    {}

WelcomeUser.propTypes =
    {
        user: PropTypes.objectOf(PropTypes.object).isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        handleLogoutClicked: PropTypes.func.isRequired
    };

export default WelcomeUser
