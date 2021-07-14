import React from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import "../styles/login.css"

function LoginButton({
                         isLoggedIn,
                         handleLoginClicked,
                         user
                     }) {
    if (user !== null) {
        return (
            <h2> </h2>
        )
    }
    return (
        <div className="login-logout-button-div">
            <Button type='button' variant="outline-secondary" onClick={handleLoginClicked}>
                Login
            </Button>
        </div>
    )
}

LoginButton.defaultProps = {}

LoginButton.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    handleLoginClicked: PropTypes.func.isRequired,
    user: PropTypes.objectOf(PropTypes.object).isRequired
};

export default LoginButton