import React, {useEffect} from "react";
import PropTypes from "prop-types";
import "../styles/login.css"
import {Button, Form} from "react-bootstrap";


function ForgotPassword({
                            handleForgotChange,
                            forgotEmail,
                            emailError,
                            validateForgotEmail,
                            setEmailError,
                            handleCloseForgot,
                            submitForgotPassword
                        }) {

    // email validation
    useEffect(
        () => {
            if (!forgotEmail) {
                setEmailError("");
            } else if (validateForgotEmail(forgotEmail)) {
                setEmailError("");
            } else {
                setEmailError("Please enter a valid email.");
            }
        },
        [forgotEmail]
    );

    function sendEmail() {
        if (forgotEmail === null) {
            console.log("Please enter an email.");
        } else {
            fetch('http://localhost:4000/login-router/forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: forgotEmail,
            }).then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    console.log("Forgot password");
                    window.alert("Reset password link sent. Please check your email.");
                } else {
                    console.log("Failed forgot password");
                    window.alert("User not found. Please register to continue.");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <Form>
            <h2>Forgot Password</h2>
            <br/>
            <span>If your are registered in our system, you will receive an email to reset your password.</span>
            <br/>
            <br/>
            <div className="form-group">
                <input
                    type="email"
                    name="forgotEmail"
                    id="forgotEmail"
                    placeholder="sample@sample.com"
                    onChange={handleForgotChange}
                    value={forgotEmail}
                />
                <div className="error">{emailError}</div>
            </div>

            <div className="registration-form-buttons">
                <Button className="reg-close-button" variant="secondary" onClick={handleCloseForgot}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitForgotPassword}>
                    Submit
                </Button>
            </div>
        </Form>
    )
}

ForgotPassword.defaultProps = {}

ForgotPassword.propTypes = {
    handleForgotChange: PropTypes.func,
    forgotEmail: PropTypes.string,
    emailError: PropTypes.string.isRequired,
    validateForgotEmail: PropTypes.func.isRequired,
    setEmailError: PropTypes.func.isRequired,
    handleCloseForgot: PropTypes.func,
    submitForgotPassword: PropTypes.func
};

export default ForgotPassword