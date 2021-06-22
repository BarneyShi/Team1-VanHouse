import React from "react";
import PropTypes from "prop-types";
import {Button, Form} from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

import "../styles/login.css"

function RegistrationForm({email, setEmail, emailError, password, setPassword, passwordError, confirmPassword, setConfirmPassword, confirmPasswordError, handleClose, setIsLoginVisible, error}) {
    // https://codesandbox.io/s/403r19kl47?file=/src/styles.css:0-30
    // Accessed June 7, 2021
    return (
        <form>
            <div className="form-inner">
                <h2>Register to comment, post, and more!</h2>
                {(error !== "") ? (<div className="error">{error}</div>) : ""}
                <div className="form-group">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                        <div className="error">{emailError}</div>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
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
                    <Button variant="primary">
                        Register
                    </Button>
                </div>
            </div>
        </form>
    )
}

RegistrationForm.defaultProps = {
    error: "",
    email: "",
    password: "",
};
  
RegistrationForm.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    setEmail: PropTypes.func.isRequired,
    emailError: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    passwordError: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired, 
    setConfirmPassword: PropTypes.func.isRequired,
    confirmPasswordError: PropTypes.string.isRequired, 
    handleClose: PropTypes.func.isRequired,
    setIsLoginVisible: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default RegistrationForm
