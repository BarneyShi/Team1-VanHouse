import React from "react";
import PropTypes from "prop-types";
import "../styles/login.css"


function LogoutButton({
                         isLoggedIn,
                         handleLogoutClicked,
                     }) {
    return (
        <div className="login-logout-button-div">
            {isLoggedIn &&
            <button type='button' className="login-logout-button" onClick={handleLogoutClicked}>
                Logout
            </button>
            }
        </div>
    )
}

LogoutButton.defaultProps = {
    // isLoggedIn: false
}

LogoutButton.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    handleLogoutClicked: PropTypes.func.isRequired
};

export default LogoutButton