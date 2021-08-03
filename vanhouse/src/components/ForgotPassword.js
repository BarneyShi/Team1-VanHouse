import React, {useEffect} from "react";
import PropTypes from "prop-types";
import "../styles/login.css"
import {Alert, Button, Form, Modal} from "react-bootstrap";


function ForgotPassword({
                            handleForgotChange,
                            forgotEmail,
                            emailError,
                            validateForgotEmail,
                            setEmailError,
                            handleCloseForgot,
                            submitForgotPassword,
                            forgotPasswordNoEntry,
                            setForgotPasswordNoEntry,
                            forgotPasswordUserNotFound,
                            setForgotPasswordUserNotFound
                        }) {

    // email validation
    useEffect(
        () => {
            if (forgotEmail === null) {
                setEmailError("");
            } else if (validateForgotEmail(forgotEmail)) {
                setEmailError("");
            } else {
                setEmailError("Please enter a valid email.");
            }
        },
        [forgotEmail]
    );

    return (
        <Form>
            <h2>Forgot Password</h2>
            {forgotPasswordNoEntry &&
            <Alert
                variant="danger"
                onClose={() => setForgotPasswordNoEntry(false)}
                dismissible>
                <Alert.Heading></Alert.Heading>
                <p>Please enter an email.</p>
            </Alert>
            }
            {forgotPasswordUserNotFound &&
            <Alert
                variant="danger"
                onClose={() => setForgotPasswordUserNotFound(false)}
                dismissible>
                <Alert.Heading></Alert.Heading>
                <p>User not found. Please register to continue.</p>
            </Alert>
            }
            <span>If you are registered in our system, you will receive an email to reset your password.</span>
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
                <Button type="submit" variant="primary" onClick={submitForgotPassword}>
                    Submit
                </Button>
            </div>
        </Form>
    )
}

ForgotPassword.defaultProps = {}

ForgotPassword.propTypes = {
    handleForgotChange: PropTypes.func.isRequired,
    forgotEmail: PropTypes.string.isRequired,
    emailError: PropTypes.string.isRequired,
    validateForgotEmail: PropTypes.func.isRequired,
    setEmailError: PropTypes.func.isRequired,
    handleCloseForgot: PropTypes.func.isRequired,
    submitForgotPassword: PropTypes.func.isRequired,
    forgotPasswordNoEntry: PropTypes.bool,
    setForgotPasswordNoEntry: PropTypes.func,
    forgotPasswordUserNotFound: PropTypes.bool,
    setForgotPasswordUserNotFound: PropTypes.func
};

export default ForgotPassword