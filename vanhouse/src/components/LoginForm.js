import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import RegistrationForm from "./RegistrationForm"
import "../styles/login.css"

function LoginForm({
                       show,
                       handleClose,
                       submit,
                       isLoginVisible,
                       setIsLoginVisible,
                       isRegistrationVisible,
                       isRegisterButtonVisible,
                       setIsRegistrationVisible,
                       setIsRegisterButtonVisible,
                       // firstName,
                       // setFirstName,
                       // lastName,
                       // setLastName,
                       email,
                       setEmail,
                       // password,
                       setPassword,
                       passwordError,
                       setPasswordError,
                       // user,
                       loginError,
                       // regEmail,
                       // setRegEmail,
                       regPassword,
                       // setRegPassword,
                       register,
                       regUser,
                       handleRegChange,
                       confirmPassword,
                       setConfirmPassword,
                       confirmPasswordError,
                       setConfirmPasswordError,
                       emailError,
                       setEmailError,
                       validateEmail
                   }) {

    // https://codesandbox.io/s/403r19kl47?file=/src/styles.css:0-30
    // Accessed June 7, 2021
    const setVisibilities = () => {
        setIsRegistrationVisible(!isRegistrationVisible);
        setIsLoginVisible(!isLoginVisible);
        setIsRegisterButtonVisible(!isRegisterButtonVisible);
    }

    const handleSubmit = e => {
        e.preventDefault();
        submit(email);
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
                <Modal.Footer>
                    <Link to="/forgot">
                        Forgot password?
                    </Link>
                </Modal.Footer>
            </Form>
            }

            <div className="register-button-and-form">
                {isRegisterButtonVisible &&
                <Button
                    variant="success"
                    onClick={() => setVisibilities()}>
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
                <br/>
                <br/>
            </div>
        </Modal>
    )
}

LoginForm.defaultProps = {
    loginError: ""
}

LoginForm.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    isLoginVisible: PropTypes.bool.isRequired,
    setIsLoginVisible: PropTypes.func.isRequired,
    isRegistrationVisible: PropTypes.bool.isRequired,
    setIsRegistrationVisible: PropTypes.func.isRequired,
    isRegisterButtonVisible: PropTypes.bool.isRequired,
    setIsRegisterButtonVisible: PropTypes.func.isRequired,
    // firstName: PropTypes.string,
    // setFirstName: PropTypes.func.isRequired,
    // lastName: PropTypes.string,
    // setLastName: PropTypes.func.isRequired,
    loginError: PropTypes.string,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    // password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    passwordError: PropTypes.string.isRequired,
    setPasswordError: PropTypes.func.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    setConfirmPassword: PropTypes.func.isRequired,
    confirmPasswordError: PropTypes.string.isRequired,
    setConfirmPasswordError: PropTypes.func.isRequired,
    // user: PropTypes.objectOf(PropTypes.object),
    // user: PropTypes.shape({ firstName: PropTypes.string }),
    // regEmail: PropTypes.string.isRequired,
    // setRegEmail: PropTypes.func.isRequired,
    regPassword: PropTypes.string.isRequired,
    // setRegPassword: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    // regUser: PropTypes.objectOf(PropTypes.object).isRequired,
    regUser: PropTypes.shape({firstName: PropTypes.string}),
    handleRegChange: PropTypes.func.isRequired,
    emailError: PropTypes.string.isRequired,
    setEmailError: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired
};

export default LoginForm
