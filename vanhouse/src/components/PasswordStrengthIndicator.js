import React from "react";
import PropTypes from "prop-types";
import PasswordStrengthIndicatorItem from "./PasswordStrengthIndicatorItem";

function PasswordStrengthIndicator({
                                       passwordValidity
                                   }) {
    console.log(passwordValidity.minChar);
    return (
        <div>
            <span className="text-dark">Password must contain:</span>
            <PasswordStrengthIndicatorItem
                isValid={passwordValidity.minChar}
                text="6 or more characters"
            />
            <PasswordStrengthIndicatorItem
                isValid={passwordValidity.number}
                text="At least 1 number"
            />
            <PasswordStrengthIndicatorItem
                isValid={passwordValidity.specialChar}
                text="At least 1 special character"
            />
        </div>
    )
}

PasswordStrengthIndicator.defaultProps =
    {}
;

PasswordStrengthIndicator.propTypes =
    {
        passwordValidity: PropTypes.bool.isRequired
    };


export default PasswordStrengthIndicator;