import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import "../styles/login.css"
import usePasswordValidator from "./usePasswordValidator";
import validateEmail from "./utils";
import LoginForm from "./LoginForm";

function LoginButton({
                         isLoggedIn,
                         handleLoginClicked,
                     }) {
    return (
        <div className="login-button-div" show={isLoggedIn}>
            {isLoggedIn &&
            <button type='button' className="login-button" onClick={handleLoginClicked}>
                Login
            </button>
            }
        </div>
    )
}

LoginButton.defaultProps = {
    // isLoggedIn: false
}

LoginButton.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    handleLoginClicked: PropTypes.bool.isRequired
};

export default LoginButton