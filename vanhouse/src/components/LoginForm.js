import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import RegistrationForm from "./RegistrationForm"
import "../styles/login.css"
import ForgotPassword from "./ForgotPassword";

function LoginForm({
                       show,
                       handleClose,
                       login,
                       isLoginVisible,
                       setIsLoginVisible,
                       isRegistrationVisible,
                       setIsRegistrationVisible,
                       isRegisterButtonVisible,
                       setIsRegisterButtonVisible,
                       email,
                       setEmail,
                       setPassword,
                       passwordError,
                       setPasswordError,
                       loginError,
                       regPassword,
                       register,
                       regUser,
                       handleRegChange,
                       confirmPassword,
                       setConfirmPassword,
                       confirmPasswordError,
                       setConfirmPasswordError,
                       emailError,
                       setEmailError,
                       validateEmail,
                       isForgotVisible,
                       setIsForgotVisible,
                       isForgotButtonVisible,
                       setIsForgotButtonVisible,
                       handleForgotChange,
                       submitForgotPassword,
                       forgotEmail,
                       validateForgotEmail,
                       isFooterVisible,
                       setIsFooterVisible
                   }) {

    // https://codesandbox.io/s/403r19kl47?file=/src/styles.css:0-30
    // Accessed June 7, 2021
    const setRegVisibilities = () => {
        setIsRegistrationVisible(!isRegistrationVisible);
        setIsLoginVisible(!isLoginVisible);
        setIsRegisterButtonVisible(!isRegisterButtonVisible);
        setIsForgotButtonVisible(!isForgotButtonVisible);
        setIsFooterVisible(!isFooterVisible);
    }

    const setForgotVisibilities = () => {
        setIsForgotVisible(!isForgotVisible);
        setIsLoginVisible(!isLoginVisible);
        setIsRegisterButtonVisible(!isRegisterButtonVisible);
        setIsForgotButtonVisible(!isForgotButtonVisible);
        // setIsFooterVisible(false);
    }

    const handleSubmit = e => {
        e.preventDefault();
        login(email);
    }

    return (
        <Modal id="Login-Modal" show={show} onHide={handleClose} animation={false}>
            {isLoginVisible &&
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(loginError !== "") ? (<div className="login-error">{loginError}</div>) : ""}
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password"
                                      onChange={(e) => {
                                          setPassword(e.target.value)
                                      }}/>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Modal.Footer>
            </Form>
            }

            {isFooterVisible &&
            <Modal.Footer className="login-modal-footers">
                <div className="forgot-button-and-form">
                    {isForgotButtonVisible &&
                    <Button
                        variant="outline-info"
                        onClick={() => setForgotVisibilities()}>
                        Forgot password?
                    </Button>
                    }

                    {isForgotVisible &&
                    <ForgotPassword
                        emailError={emailError}
                        validateForgotEmail={validateForgotEmail}
                        setEmailError={setEmailError}
                        handleClose={handleClose}
                        handleForgotChange={handleForgotChange}
                        handleCloseForgot={handleClose}
                        submitForgotPassword={submitForgotPassword}
                        forgotEmail={forgotEmail}
                    />
                    }
                </div>
            </Modal.Footer>
            }
            <Modal.Footer className="login-modal-footers">
                <div className="register-button-and-form">
                    {isRegisterButtonVisible &&
                    <Button
                        variant="outline-success"
                        onClick={() => setRegVisibilities()}>
                        Register for a new account
                    </Button>
                    }

                    {isRegistrationVisible &&
                    <RegistrationForm
                        emailError={emailError}
                        setEmailError={setEmailError}
                        register={register}
                        regUser={regUser}
                        handleRegChange={handleRegChange}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        confirmPasswordError={confirmPasswordError}
                        setConfirmPasswordError={setConfirmPasswordError}
                        regPassword={regPassword}
                        handleClose={handleClose}
                        validateEmail={validateEmail}
                        passwordError={passwordError}
                        setPasswordError={setPasswordError}
                    />
                    }
                </div>
            </Modal.Footer>
        </Modal>
    )
}

LoginForm.defaultProps = {
    loginError: ""
}

LoginForm.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isLoginVisible: PropTypes.bool.isRequired,
    setIsLoginVisible: PropTypes.func.isRequired,
    isRegistrationVisible: PropTypes.bool.isRequired,
    setIsRegistrationVisible: PropTypes.func.isRequired,
    isRegisterButtonVisible: PropTypes.bool.isRequired,
    setIsRegisterButtonVisible: PropTypes.func.isRequired,
    loginError: PropTypes.string,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    passwordError: PropTypes.string.isRequired,
    setPasswordError: PropTypes.func.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    setConfirmPassword: PropTypes.func.isRequired,
    confirmPasswordError: PropTypes.string.isRequired,
    setConfirmPasswordError: PropTypes.func.isRequired,
    regPassword: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    regUser: PropTypes.shape({firstName: PropTypes.string}),
    handleRegChange: PropTypes.func.isRequired,
    emailError: PropTypes.string.isRequired,
    setEmailError: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired,
    isForgotVisible: PropTypes.bool,
    setIsForgotVisible: PropTypes.func,
    isForgotButtonVisible: PropTypes.bool,
    setIsForgotButtonVisible: PropTypes.func,
    handleForgotChange: PropTypes.func,
    submitForgotPassword: PropTypes.func,
    forgotEmail: PropTypes.string,
    validateForgotEmail: PropTypes.func,
    isFooterVisible: PropTypes.bool,
    setIsFooterVisible: PropTypes.func
};

export default LoginForm
