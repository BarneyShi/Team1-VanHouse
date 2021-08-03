import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Alert, Button, Form} from "react-bootstrap";
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
                              passwordError,
                              setPasswordError,
                              registerDuplicateEmail,
                              setRegisterDuplicateEmail,
                              namesError,
                              setNamesError
                          }) {

    // https://codesandbox.io/s/403r19kl47?file=/src/styles.css:0-30
    // Accessed June 7, 2021 for usePasswordValidator and utils.js

    // make sure names are filled out
    useEffect(
        () => {
            if (!regUser.firstName) {
                setNamesError(true);
            }

            if (regUser.firstName.length > 1) {
                setNamesError(false);
            }
        },
        [regUser.firstName]
    );

    useEffect(
        () => {
            if (!regUser.lastName) {
                setNamesError(true);
            }

            if (regUser.lastName.length > 1) {
                setNamesError(false);
            }
        },
        [regUser.lastName]
    )

    // email validation
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


    // password validation
    const config = {min: 6, max: 15}

    useEffect(
        () => {
            setPasswordError("");

            if (regUser.password === null || regUser.password === undefined) {
                return setPasswordError(`Please choose a password`);
            }

            if (regUser.password.length < config.min) {
                return setPasswordError(`Password must be at least ${config.min} characters.`);
            }

            if (regUser.password.length > config.max) {
                return setPasswordError(
                    `Password must be less than ${config.max} characters.`
                );
            }

            const reNum = /^(?=.*\d)/;
            const numBool = reNum.test(String(regUser.password).toLowerCase());

            if (!numBool) {
                return setPasswordError(
                    `Password must contain at least 1 number.`
                );
            }

            const reChar = /^(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]/;
            const charBool = reChar.test(String(regUser.password).toLowerCase());

            if (!charBool) {
                return setPasswordError(
                    `Password must contain at least 1 special character.`
                );
            }

            return null;
        },
        [regUser.password]
    );

    // confirm password validation
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
            <h2>Register</h2>
            {registerDuplicateEmail &&
            <Alert
                variant="danger"
                onClose={() => setRegisterDuplicateEmail(false)}
                dismissible>
                <Alert.Heading></Alert.Heading>
                <p>User already exists. </p>
                <p>Please use a different email, or recover your account by clicking the "Forgot password" link.</p>
            </Alert>
            }
            <span>For full access to our features, including ability to </span>
            <br/>
            <span> posting your own properties, please register.</span>
            <br/>
            <br/>
            <div className="form-group">
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter first name*"
                    onChange={handleRegChange}
                    value={regUser.firstName}
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter last name*"
                    onChange={handleRegChange}
                    value={regUser.lastName}
                />
            </div>

            <div className="form-group">
                <input
                    type="email"
                    name="regEmail"
                    id="regEmail"
                    placeholder="sample@sample.com*"
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
                    placeholder="Password*"
                    onChange={handleRegChange}
                    value={regUser.password}
                />
                <div className="error">{passwordError}</div>
            </div>

            <div className="form-group">
                <input
                    type="password"
                    name="password"
                    placeholder="Confirm password*"
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
                <Button className="reg-close-button" variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button type="submit" variant="primary" onClick={register}>
                    Register
                </Button>
            </div>
        </Form>
    )
}

RegistrationForm.defaultProps = {
};

RegistrationForm.propTypes = {
    emailError: PropTypes.string.isRequired,
    setEmailError: PropTypes.func.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    setConfirmPassword: PropTypes.func.isRequired,
    confirmPasswordError: PropTypes.string.isRequired,
    setConfirmPasswordError: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    regUser: PropTypes.objectOf(PropTypes.object).isRequired,
    handleRegChange: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired,
    passwordError: PropTypes.string.isRequired,
    setPasswordError: PropTypes.func.isRequired,
    registerDuplicateEmail: PropTypes.bool,
    setRegisterDuplicateEmail: PropTypes.func,
    namesError: PropTypes.bool,
    setNamesError: PropTypes.func
};

export default RegistrationForm
