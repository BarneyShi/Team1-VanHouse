import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import "../styles/login.css"

function WelcomeUser({
                         user,
                         isLoggedIn
                     }) {

    return (
        <div className="welcome-user-inner-div">
            {isLoggedIn &&
            <span className="welcome-text">Hi, {user.name}!</span>
            }
        </div>
    )
}

WelcomeUser.defaultProps = {}

WelcomeUser.propTypes = {
    user: PropTypes.objectOf(PropTypes.object).isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};

export default WelcomeUser
