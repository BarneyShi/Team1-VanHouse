import React from "react";
import PropTypes from "prop-types";
import "../styles/login.css"

function AccountDetails({
                         handleAccountClicked,
                         user
                     }) {
    // if (user !== null) {
    //     return (
    //         <h2> </h2>
    //     )
    // }
    return (
        <div>
            <br/>
            <br/>
            <h2>Your Account</h2>
            <br/>
            <br/>
            <br/>
            <br/>
            <h4>*** COMING SOON ***</h4>
        </div>
    )
}

AccountDetails.defaultProps = {}

AccountDetails.propTypes = {
    handleAccountClicked: PropTypes.func.isRequired,
    user: PropTypes.objectOf(PropTypes.object).isRequired
};

export default AccountDetails