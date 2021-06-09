import React, {useEffect, useState} from "react";
import RegistrationForm from "./RegistrationForm"
import "./login.css"
import usePasswordValidator from "./usePasswordValidator";
import {validateEmail} from "./utils";
import {Button, Form, Modal} from "react-bootstrap";

function LoginForm(props) {
    const [details, setDetails] = useState({name: "", email: "", password: ""});
    const [isVisible, setIsVisible] = useState(false);

    // https://codesandbox.io/s/403r19kl47?file=/src/styles.css:0-30
    // Accessed June 7, 2021
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [password, setPassword, passwordError] = usePasswordValidator({
        min: 8,
        max: 15
    });

    useEffect(
        () => {
            if (!email) {
                setEmailError("");
            } else {
                if (validateEmail(email)) {
                    setEmailError("");
                } else {
                    setEmailError("Please enter a valid email.");
                }
            }
        },
        [email]
    );

    useEffect(
        () => {
            if (!confirmPassword || !password) {
                setConfirmPasswordError("");
            } else {
                if (password !== confirmPassword) {
                    setConfirmPasswordError("The passwords must match.");
                } else {
                    setConfirmPasswordError("");
                }
            }
        },
        [password, confirmPassword]
    );

    // end of copied code

    const handleSubmit = e => {
        e.preventDefault();
        props.submit(details);
    }

    return (
        <Modal show={props.show} onHide={props.handleClose} animation={false}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(props.error != "") ? (<div className="error">{props.error}</div>) : ""}
                    <Form.Group controlId="formName">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control required type="name" placeholder="Enter name" onChange={(e) => {
                            setName(e.target.value)
                        }}/>
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address *</Form.Label>
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

                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control required type="password" placeholder="Confirm password"
                                      onChange={(e) => {
                                          setConfirmPassword(e.target.value)
                                      }}/>
                    </Form.Group>
                    <Form.Text className="text-muted">
                        * required fields
                    </Form.Text>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(e) => setIsVisible(!isVisible)}>
                        Register for a new account
                    </Button>
                    {isVisible &&
                    <RegistrationForm
                        setEmail={setEmail}
                        emailError={emailError}
                        setPassword={setPassword}
                        passwordError={passwordError}
                        setConfirmPassword={setConfirmPassword}
                        confirmPasswordError={confirmPasswordError}
                    />}
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default LoginForm
