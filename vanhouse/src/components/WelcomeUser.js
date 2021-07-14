import React from "react";
import {Dropdown} from "react-bootstrap";
import PropTypes from "prop-types";
import "../styles/login.css"

function WelcomeUser({
                         user,
                         handleLogoutClicked,
                         handleAccountClicked
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
                    <Dropdown.Item onClick={handleAccountClicked}>Account</Dropdown.Item>
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
        handleLogoutClicked: PropTypes.func.isRequired,
        handleAccountClicked: PropTypes.func.isRequired
    };

export default WelcomeUser
