import React from "react";
import {Alert, Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import RegistrationForm from "./RegistrationForm"
import "../styles/login.css"
import ForgotPassword from "./ForgotPassword";
import { useTranslation } from 'react-i18next';
import { trim } from "jquery";

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
                       setLoginError,
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
                       setIsFooterVisible,
                       forgotPasswordNoEntry,
                       setForgotPasswordNoEntry,
                       forgotPasswordUserNotFound,
                       setForgotPasswordUserNotFound,
                       registerDuplicateEmail,
                       setRegisterDuplicateEmail,
                       namesError,
                       setNamesError
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
    }

    const handleSubmit = e => {
        e.preventDefault();
        login(email);
    }

    const { t, i18n } = useTranslation();

    return (
        <Modal id="Login-Modal" show={show} onHide={handleClose} animation={false}>
            {isLoginVisible &&
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>{t('Login')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loginError &&
                    <Alert
                        className="login-error-alert"
                        variant="danger"
                        onClose={() => setLoginError(false)}
                        dismissible>
                        <Alert.Heading>Invalid login or password.</Alert.Heading>
                        <p>Please re-check your login information or register for a new account.</p>
                    </Alert>
                    }
                    <Form.Group controlId="formEmail">
                    <Form.Label>{t('Email address')}</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>{t('Password')}</Form.Label>
                        <Form.Control required type="password" placeholder="Password"
                                      onChange={(e) => {
                                          setPassword(e.target.value)
                                      }}/>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('Close')}
                    </Button>
                    <Button variant="primary" type="submit">
                        {t('Login')}
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
                        {t('Forgot Password')}?
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
                        forgotPasswordNoEntry={forgotPasswordNoEntry}
                        setForgotPasswordNoEntry={setForgotPasswordNoEntry}
                        forgotPasswordUserNotFound={forgotPasswordUserNotFound}
                        setForgotPasswordUserNotFound={setForgotPasswordUserNotFound}
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
                        {t('Register for a new account')}
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
                        handleClose={handleClose}
                        validateEmail={validateEmail}
                        passwordError={passwordError}
                        setPasswordError={setPasswordError}
                        registerDuplicateEmail={registerDuplicateEmail}
                        setRegisterDuplicateEmail={setRegisterDuplicateEmail}
                        namesError={namesError}
                        setNamesError={setNamesError}
                    />
                    }
                </div>
            </Modal.Footer>
        </Modal>
    )
}

LoginForm.defaultProps = {
    loginError: false
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
    loginError: PropTypes.bool,
    setLoginError: PropTypes.func,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    passwordError: PropTypes.string.isRequired,
    setPasswordError: PropTypes.func.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    setConfirmPassword: PropTypes.func.isRequired,
    confirmPasswordError: PropTypes.string.isRequired,
    setConfirmPasswordError: PropTypes.func.isRequired,
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
    setIsFooterVisible: PropTypes.func,
    forgotPasswordNoEntry: PropTypes.bool,
    setForgotPasswordNoEntry: PropTypes.func,
    forgotPasswordUserNotFound: PropTypes.bool,
    setForgotPasswordUserNotFound: PropTypes.func,
    registerDuplicateEmail: PropTypes.bool,
    setRegisterDuplicateEmail: PropTypes.func,
    namesError: PropTypes.bool,
    setNamesError: PropTypes.func
};

export default LoginForm
