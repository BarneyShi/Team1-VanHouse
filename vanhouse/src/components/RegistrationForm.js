import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Button, Form} from "react-bootstrap";

import {propTypes} from "react-bootstrap/esm/Image";

import "../styles/login.css"

function RegistrationForm({
                              emailError,
                              setEmailError,
                              confirmPassword,
                              setConfirmPassword,
                              confirmPasswordError,
                              setConfirmPasswordError,
                              handleClose,
                              register,
                              regUser,
                              handleRegChange,
                              validateEmail,
                              regPassword
                              // error
                          }) {

    // https://codesandbox.io/s/403r19kl47?file=/src/styles.css:0-30
    // Accessed June 7, 2021 for usePasswordValidator and utils.js
    useEffect(
        () => {
            if (!regUser.email) {
                setEmailError("");
            } else if (validateEmail(regUser.email)) {
                setEmailError("");
            } else {
                setEmailError("Please enter a valid email.");
            }
        },
        [regUser.email]
    );

    useEffect(
        () => {
            if (!confirmPassword || !regUser.password) {
                setConfirmPasswordError("");
            } else if (confirmPassword !== regUser.password) {
                setConfirmPasswordError("The passwords must match.");
            } else {
                setConfirmPasswordError("");
            }
        },
        [regUser.password, confirmPassword]
    );

    return (
        <Form>
            <h2>Register to comment, post, and more!</h2>

            <div className="form-group">
                <input
                    type="email"
                    name="regEmail"
                    id="regEmail"
                    placeholder="sample@sample.com"
                    onChange={handleRegChange}
                    value={regUser.email}
                />
                <div className="error">{emailError}</div>
            </div>

            <div className="form-group">
                <input
                    type="password"
                    name="regPassword"
                    id="regPassword"
                    placeholder="Password"
                    onChange={handleRegChange}
                    value={regUser.password}
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    name="password"
                    placeholder="Confirm password"
                    onChange={e => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <div className="error">{confirmPasswordError}</div>
            </div>

            <Form.Text className="text-muted">
                * required fields
            </Form.Text>
            <br/>
            <div className="registration-form-buttons">
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={register}>
                    Register
                </Button>
            </div>
        </Form>
    )
}

RegistrationForm.defaultProps = {};

RegistrationForm.propTypes = {
    emailError: PropTypes.string.isRequired,
    setEmailError: PropTypes.func.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    setConfirmPassword: PropTypes.func.isRequired,
    confirmPasswordError: PropTypes.string.isRequired,
    setConfirmPasswordError: PropTypes.func.isRequired,
    regPassword: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    regUser: PropTypes.objectOf(PropTypes.object).isRequired,
    handleRegChange: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired
    // error: PropTypes.string,
};

export default RegistrationForm
