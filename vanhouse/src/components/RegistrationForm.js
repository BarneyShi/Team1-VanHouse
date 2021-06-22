import React from "react";
import PropTypes from "prop-types";
import {Button, Form} from "react-bootstrap";
import {propTypes} from "react-bootstrap/esm/Image";

import "../styles/login.css"

function RegistrationForm({
                              regEmail,
                              setRegEmail,
                              emailError,
                              regPassword,
                              setRegPassword,
                              passwordError,
                              // confirmPassword,
                              // setConfirmPassword,
                              // confirmPasswordError,
                              // setConfirmPasswordError,
                              handleClose,
                              register,
                              regUser,
                              handleRegChange
                              // error
                          }) {
    // useEffect(
    //     () => {
    //         if (!confirmPassword || !password) {
    //             setConfirmPasswordError("");
    //         } else if (password !== confirmPassword) {
    //             setConfirmPasswordError("The passwords must match.");
    //         } else {
    //             setConfirmPasswordError("");
    //         }
    //     },
    //     [regPassword, confirmPassword]
    // );

    // const handleRegSubmit = e => {
    //     e.preventDefault();
    //     register(regEmail, regPassword);
    // }

    // https://codesandbox.io/s/403r19kl47?file=/src/styles.css:0-30
    // Accessed June 7, 2021
    return (
        <form>
            <div className="form-inner">
                <h2>Register to comment, post, and more!</h2>
                <div className="form-group">
                    <input
                        type="text"
                        name="regEmail"
                        id="regEmail"
                        placeholder="Email"
                        onChange={handleRegChange}
                        value={regUser.regEmail}
                    />
                    <div className="error">{emailError}</div>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="regPassword"
                        id="regPassword"
                        placeholder="Password"
                        onChange={handleRegChange}
                        value={regUser.regPassword}
                    />
                </div>
                <div className="form-group">

                </div>
                <Form.Text className="text-muted">
                    * required fields
                </Form.Text>
                <br/>
                <div className="registration-form-buttons">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={register}>
                        Register
                    </Button>
                </div>
            </div>
        </form>
    )
}

RegistrationForm.defaultProps = {
    // error: "",
    regEmail: "",
    regPassword: "",
};

RegistrationForm.propTypes = {
    regEmail: PropTypes.string,
    regPassword: PropTypes.string,
    setRegEmail: PropTypes.func.isRequired,
    emailError: PropTypes.string.isRequired,
    setRegPassword: PropTypes.func.isRequired,
    passwordError: PropTypes.string.isRequired,
    // confirmPassword: PropTypes.string.isRequired,
    // setConfirmPassword: PropTypes.func.isRequired,
    // confirmPasswordError: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    regUser: PropTypes.objectOf(PropTypes.object).isRequired,
    handleRegChange: PropTypes.func.isRequired
    // error: PropTypes.string,
};

export default RegistrationForm
