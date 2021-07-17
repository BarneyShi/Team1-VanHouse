import React from "react";
import PropTypes from "prop-types";
import "../styles/login.css"


function LogoutButton({
                          user,
                          handleLogoutClicked,
                      }) {
    if (user === null) {
        return (
            <h2>

            </h2>
        )
    }
    return (
        <div className="login-logout-button-div">
            <button type='button' className="login-logout-button" onClick={handleLogoutClicked}>
                Logout
            </button>
        </div>
    )
}

LogoutButton.defaultProps = {}

LogoutButton.propTypes = {
    user: PropTypes.objectOf(PropTypes.object).isRequired,
    handleLogoutClicked: PropTypes.func.isRequired
};

export default LogoutButton