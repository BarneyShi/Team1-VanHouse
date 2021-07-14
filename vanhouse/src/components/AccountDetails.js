import React from "react";
import PropTypes from "prop-types";
import "../styles/login.css"

function AccountDetails({
                         handleAccountClicked,
                         user
                     }) {
    if (user !== null) {
        return (
            <h2> </h2>
        )
    }
    return (
        <div>
            <h2>HELLO</h2>
        </div>
    )
}

AccountDetails.defaultProps = {}

AccountDetails.propTypes = {
    handleAccountClicked: PropTypes.func.isRequired,
    user: PropTypes.objectOf(PropTypes.object).isRequired
};

export default AccountDetails