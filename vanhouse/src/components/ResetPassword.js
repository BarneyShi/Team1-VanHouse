import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useHistory, useParams} from 'react-router-dom';
import "../styles/login.css"

function ResetPassword() {

    const history = useHistory();

    const [resetPassword, setResetPassword] = useState("");

    const {token} = useParams();

    function submitResetPassword(e) {
        e.preventDefault();
        if (!resetPassword) {
            window.alert("Please enter a new password.");
        } else {
            // fetch('http://localhost:4000/login-router/resetPassword', {
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