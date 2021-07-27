import React from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import "../styles/login.css"

function LoginButton({
                         handleLoginClicked,
                         user,
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

    // https://stackoverflow.com/questions/52864510/react-warning-failed-prop-type-invalid-prop-of-type-object-supplied
    // Accessed July 27, 2021

    // user: PropTypes.objectOf(PropTypes.object)
    user: PropTypes.shape({ firstName: PropTypes.string }),
};

export default LoginButton