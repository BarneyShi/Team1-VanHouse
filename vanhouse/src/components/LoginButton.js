import React from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import "../styles/login.css"

function LoginButton({
                         handleLoginClicked,
                         user,
                         setUser,
                     }) {
    if (user !== null) {
        return (
            <h2>

            </h2>
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
    handleLoginClicked: PropTypes.func.isRequired,
    user: PropTypes.objectOf(PropTypes.object).isRequired,
    setUser: PropTypes.func.isRequired,
};

export default LoginButton