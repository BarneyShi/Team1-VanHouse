import React from "react";
import PropTypes from "prop-types";
import "../styles/login.css"
import {Button, Form} from "react-bootstrap";


function ForgotPassword({
                            handleForgotChange,
                            forgotEmail,
                            emailError,
                            handleCloseForgot,
                            forgot
                        }) {
    return (
        <Form>
            <h2>Forgot Password</h2>
            <br/>
            <div className="form-group">
                <input
                    type="email"
                    name="regEmail"
                    id="regEmail"
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
                <Button variant="primary" onClick={forgot}>
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
    handleCloseForgot: PropTypes.func,
    forgot: PropTypes.func
};

export default ForgotPassword