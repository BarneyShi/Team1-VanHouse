import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import "../styles/header.css";
import LoginForm from "./LoginForm";
import LoginButton from "./LoginButton";
import WelcomeUser from "./WelcomeUser";

import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';
import earth from "../assets/earth.png";
import GlobalEvent from './Events';

function Header({updateUser}) {

    const history = useHistory();

    const [isLoginClicked, setIsLoginClicked] = useState(false);
    const [isLoginVisible, setIsLoginVisible] = useState(true);
    const [isRegistrationVisible, setIsRegistrationVisible] = useState(false);
    const [isRegisterButtonVisible, setIsRegisterButtonVisible] = useState(true);
    const [isForgotVisible, setIsForgotVisible] = useState(false);
    const [isForgotButtonVisible, setIsForgotButtonVisible] = useState(true);
    const [isFooterVisible, setIsFooterVisible] = useState(true);

    // Login Form states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, setUser] = useState(null);

    // Registration Form states
    const [regUser, setRegUser] = useState({firstName: "", lastName: "", email: "", password: null});
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [namesError, setNamesError] = useState(false);

    // submitForgotPassword states
    const [forgotEmail, setForgotEmail] = useState(null);

    // Alert error states
    const [loginError, setLoginError] = useState(false);
    const [forgotPasswordNoEntry, setForgotPasswordNoEntry] = useState(false);
    const [forgotPasswordUserNotFound, setForgotPasswordUserNotFound] = useState(false);
    const [registerDuplicateEmail, setRegisterDuplicateEmail] = useState(false);
    const [language, setLanguage] = useState("en");
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        setLanguage(lang);
        console.log("change lang:", lang)
        i18n.changeLanguage(lang);
        localStorage.setItem("page_language", lang);
    }


    // Functions
    const handleLoginClicked = () => {
        setIsLoginClicked(true);
    }

    function Login() {
        fetch(`/login-router/login`, {
            method: 'POST',
            // https://stackoverflow.com/questions/36824106/express-doesnt-set-a-cookie
            // Accessed July 13, 2021
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        }).then((response) => {
            console.log(response.status);
            if (response.status === 401) {
                setPassword("");
                setLoginError(true);
            }

            if (response.status === 200) {
                response.json()
                    .then(response2 => {
                        setUser(response2); // only setting this to re-render component automatically
                        updateUser(response2)
                        setIsLoginClicked(false);
                        // window.location.reload();
                        // console.log("user login:", response2);
                        GlobalEvent.emit('user_login', response2);
                    });
            }
        });
    }

    const handleLogoutClicked = () => {
        fetch(`/login-router/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then((response) => {
            response.json()
                .then((resJSON) => {
                    console.log("logout response ", resJSON);
                    GlobalEvent.emit('user_logout', "");
                    updateUser(null);
                });
        });

        setUser(null);
        setLoginError(false);
    }

    const handleHomeClicked = () => {
        history.push('/');
        // window.location.reload();
    }

    const handleAccountClicked = () => {
        fetch(`/login-router/account`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then((response) => {
            response.json()
                .then((resJSON => {
                        console.log(resJSON);
                        history.push(`/login-router/account`);
                        window.location.reload();
                    })
                )
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    const handleCloseModal = () => {
        setIsLoginClicked(false);
        setIsLoginVisible(true);
        setIsRegistrationVisible(false);
        setIsRegisterButtonVisible(true);
        setLoginError(false);
        setConfirmPassword("");
        setRegUser("");
        setEmail("");
        setPassword("");
        setIsForgotVisible(false);
        setIsForgotButtonVisible(true);
        setIsFooterVisible(true);
        setForgotEmail(null);
        setForgotPasswordNoEntry(false);
        setForgotPasswordUserNotFound(false);
        setRegisterDuplicateEmail(false);
        setNamesError(false);
    }


    function Register(e) {
        console.log(namesError);
        if (confirmPasswordError === "" && passwordError === "" && emailError === "" && namesError === false) {
            e.preventDefault();
            fetch(`/login-router/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(regUser),
            }).then((response) => {
                console.log(response.status);
                if (response.status === 201) {
                    console.log("Registered user to Mongo");
                    setRegUser({firstName: null, lastName: null, regEmail: "", regPassword: ""});
                    setIsRegistrationVisible(!isRegistrationVisible);
                    setIsRegisterButtonVisible(!isRegisterButtonVisible);
                    setIsForgotButtonVisible(!isForgotButtonVisible);
                    setIsFooterVisible(!isFooterVisible);
                    setIsLoginVisible(!isLoginVisible);
                    setIsLoginClicked(!isLoginClicked);
                    setConfirmPassword("");
                    setLoginError(false);
                    setRegisterDuplicateEmail(false);
                    setNamesError(false);
                    window.alert("Successfully registered! Please login to continue.");
                } else {
                    console.log(response.status);
                    setRegisterDuplicateEmail(true);
                }
            });
        } else {
            e.preventDefault();
            window.confirm("Please re-check your registration information.");
        }
    }

    function handleRegChange(e) {
        const {value, id} = e.target;
        setRegUser(prevValue => {
            if (id === "firstName") {
                return {
                    firstName: value,
                    lastName: prevValue.lastName,
                    email: prevValue.email,
                    password: prevValue.password
                };
            }
            if (id === "lastName") {
                return {
                    firstName: prevValue.firstName,
                    lastName: value,
                    email: prevValue.email,
                    password: prevValue.password
                };
            }
            if (id === "regEmail") {
                return {
                    firstName: prevValue.firstName,
                    lastName: prevValue.lastName,
                    email: value,
                    password: prevValue.password
                };
            }
            if (id === "regPassword") {
                return {
                    firstName: prevValue.firstName,
                    lastName: prevValue.lastName,
                    email: prevValue.email,
                    password: value
                };
            }
            return regUser;
        });
    }

    function validateEmail() {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(regUser.email).toLowerCase());
    }

    function validateForgotEmail() {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(forgotEmail).toLowerCase());
    }

    function submitForgotPassword(e) {
        const em = forgotEmail;
        if (emailError === "") {
            e.preventDefault();
            if (!forgotEmail) {
                setForgotPasswordNoEntry(true);
            } else {
                fetch(`/login-router/forgot`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({em, forgotEmail}),
                }).then((response) => {
                    if (response.status === 200) {
                        setIsRegisterButtonVisible(!isRegisterButtonVisible);
                        setIsLoginVisible(!isLoginVisible);
                        setIsLoginClicked(!isLoginClicked);
                        setIsForgotVisible(!isForgotVisible);
                        setIsForgotButtonVisible(!isForgotButtonVisible);
                        setForgotEmail(null);
                        setForgotPasswordNoEntry(false);
                        setForgotPasswordUserNotFound(false);
                        window.alert("Reset password link sent. Please check your email.");
                    } else {
                        setForgotPasswordUserNotFound(true);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }

    function handleForgotChange(e) {
        setForgotEmail(e.target.value);
        console.log(forgotEmail);
        return forgotEmail;
    }

    return (
        <div className="header-flexbox">
            <LoginForm
                show={isLoginClicked}
                handleClose={handleCloseModal}
                login={Login}
                isLoginVisible={isLoginVisible}
                setIsLoginVisible={setIsLoginVisible}
                isRegistrationVisible={isRegistrationVisible}
                setIsRegistrationVisible={setIsRegistrationVisible}
                isRegisterButtonVisible={isRegisterButtonVisible}
                setIsRegisterButtonVisible={setIsRegisterButtonVisible}
                email={email}
                setEmail={setEmail}
                setPassword={setPassword}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                loginError={loginError}
                setLoginError={setLoginError}
                register={Register}
                regUser={regUser}
                handleRegChange={handleRegChange}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                confirmPasswordError={confirmPasswordError}
                setConfirmPasswordError={setConfirmPasswordError}
                emailError={emailError}
                setEmailError={setEmailError}
                validateEmail={validateEmail}
                isForgotVisible={isForgotVisible}
                setIsForgotVisible={setIsForgotVisible}
                isForgotButtonVisible={isForgotButtonVisible}
                setIsForgotButtonVisible={setIsForgotButtonVisible}
                handleForgotChange={handleForgotChange}
                submitForgotPassword={submitForgotPassword}
                forgotEmail={forgotEmail}
                setForgotEmail={setForgotEmail}
                validateForgotEmail={validateForgotEmail}
                isFooterVisible={isFooterVisible}
                setIsFooterVisible={setIsFooterVisible}
                forgotPasswordNoEntry={forgotPasswordNoEntry}
                setForgotPasswordNoEntry={setForgotPasswordNoEntry}
                forgotPasswordUserNotFound={forgotPasswordUserNotFound}
                setForgotPasswordUserNotFound={setForgotPasswordUserNotFound}
                registerDuplicateEmail={registerDuplicateEmail}
                setRegisterDuplicateEmail={setRegisterDuplicateEmail}
                namesError={namesError}
                setNamesError={setNamesError}
            />
            <div className="title-and-logo-flexbox">
                <img
                    src="data:image/png;base64,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"
                    className="App-logo"
                    alt="logo"/>
                <h1 className="App-title">{t('VANHOUSE')}</h1>
            </div>

            <div className="header-buttons">
                <div className="row mr-1">
                   <div className="dropdown">
                        <a className="btn " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className="dropdown-img" alt="triangle" src={earth} />
                        </a>
                        
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" onClick={e=>{changeLanguage('en')}}>🇺🇸 English</a>
                            <a className="dropdown-item" onClick={e=>{changeLanguage('cn')}}>🇨🇳 简体中文</a>
                        </div>
                    </div>
                </div>
                <div className="home-button">
                    <Button
                        variant="outline-primary"
                        onClick={handleHomeClicked}
                    >
                        {t('Home')}
                    </Button>
                </div>
                <div className="login-logout-button">
                    <LoginButton
                        user={user}
                        handleLoginClicked={handleLoginClicked}
                    />
                    <WelcomeUser
                        user={user}
                        setUser={setUser}
                        handleLogoutClicked={handleLogoutClicked}
                        handleAccountClicked={handleAccountClicked}
                    />
                </div>
            </div>
        </div>
    )
}

Header.propTypes = {
    updateUser: PropTypes.func.isRequired
};

export default Header;
