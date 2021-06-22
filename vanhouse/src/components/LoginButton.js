import React from "react";
import PropTypes from "prop-types";
import "../styles/login.css"

function LoginButton({
                         isLoggedIn,
                         handleLoginClicked,
                     }) {
    return (
        <div className="login-logout-button-div">
            {!isLoggedIn &&
            <button type='button' className="login-logout-button" onClick={handleLoginClicked}>
                Login
            </button>
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