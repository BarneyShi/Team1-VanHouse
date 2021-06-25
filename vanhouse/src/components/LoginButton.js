import React from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import "../styles/login.css"

function LoginButton({
                         isLoggedIn,
                         handleLoginClicked,
                     }) {
    return (
        <div className="login-logout-button-div">
            {!isLoggedIn &&
            <Button type='button' variant="outline-secondary" onClick={handleLoginClicked}>
                Login
            </Button>
            }
        </div>
    )
}

LoginButton.defaultProps = {
}

LoginButton.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    handleLoginClicked: PropTypes.func.isRequired
};

export default LoginButton