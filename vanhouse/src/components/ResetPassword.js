import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useHistory, useParams} from 'react-router-dom';
import "../styles/login.css"

function ResetPassword() {

    const history = useHistory();

    const [resetPassword, setResetPassword] = useState("");
    const [passwordResetError, setPasswordResetError] = useState("");

    const {token} = useParams();

    // password validation
    const config = {min: 6, max: 15}

    useEffect(
        () => {
            setPasswordResetError("");

            if (resetPassword.length === null || resetPassword === undefined) {
                return setPasswordResetError(`Please choose a password`);
            }

            if (resetPassword.length < config.min) {
                return setPasswordResetError(`Password must be at least ${config.min} characters.`);
            }

            if (resetPassword.length > config.max) {
                return setPasswordResetError(
                    `Password must be less than ${config.max} characters.`
                );
            }

            const reNum = /^(?=.*\d)/;
            const numBool = reNum.test(String(resetPassword).toLowerCase());

            if (!numBool) {
                return setPasswordResetError(
                    `Password must contain at least 1 number.`
                );
            }

            const reChar = /^(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]/;
            const charBool = reChar.test(String(resetPassword).toLowerCase());

            if (!charBool) {
                return setPasswordResetError(
                    `Password must contain at least 1 special character.`
                );
            }

            return null;
        },
        [resetPassword]
    );

    function submitResetPassword(e) {
        e.preventDefault();
        if (!resetPassword) {
            window.alert("Please enter a new password.");
        } else {
            fetch(`/login-router/resetPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({resetToken: token, password: resetPassword}),
            }).then((response) => {
                if (response.status === 200) {
                    // https://www.youtube.com/watch?v=tiAlSpyWIDs
                    // Accessed July 28, 2021
                    history.push(`/`);
                    window.alert("Password reset. Please login to continue.")
                } else {
                    window.alert("Failed to reset password. \n\n" +
                        "Your link may have expired or it may be another issue. \n\n" +
                        "Please try again.");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    function handleResetPasswordChange(e) {
        setResetPassword(e.target.value);
        return resetPassword;
    }

    return (
        <Form className="reset-password-form-div">
            <h2>Reset Password</h2>
            <br/>
            <Form.Group>
                <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    onChange={handleResetPasswordChange}
                    value={resetPassword}>
                </Form.Control>
                <div className="error">{passwordResetError}</div>
            </Form.Group>

            <div className="reset-password-form-buttons">
                <Button type="submit" variant="primary" onClick={submitResetPassword}>
                    Reset password
                </Button>
            </div>
        </Form>
    )
}

export default ResetPassword