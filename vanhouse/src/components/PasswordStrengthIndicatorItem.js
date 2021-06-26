import React from "react";
import PropTypes from "prop-types";

// https://react-component-depot.netlify.app/signup?
// Accessed Jun 25, 2021 for password strength validator

const PasswordStrengthIndicatorItem = ({isValid, text}) => {
    // https://stackoverflow.com/questions/49353936/react-jsx-in-classname-if-else-syntax
    // Accessed Jun 25, 2021
    const highlightClass = () => {
        if (isValid) {
            return "text-success";
        }
        return "text-danger";

        // isValid ? "text-success" : isValid !== null ? "text-danger" : "";
    }
    return (
        <li className={highlightClass(isValid, text)}>{text}</li>
    )
};

PasswordStrengthIndicatorItem.defaultProps =
    {}
;

PasswordStrengthIndicatorItem.propTypes =
    {
        // passwordValidity: PropTypes.bool.isRequired,
        // setPasswordValidity: PropTypes.func.isRequired,
        isValid: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    };


export default PasswordStrengthIndicatorItem;