import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import "../styles/login.css"

function ResetPassword() {

    // resetPassword states
    const [resetPassword, setResetPassword] = useState("reset");
    const [thisUser, setThisUser] = useState(null);

    const confirmResetToken = () => {
        fetch('http://localhost:4000/login-router/checkResetToken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then((response) => {
            if (response.status === 200) {
                response.json()
                    .then(dbUser => {
                        setThisUser(dbUser); // only setting this to re-render component automatically
                        console.log("verified user with token");
                        console.log(response);
                    });
            }
        }).catch(() => {
            console.log("Could not verify token.");
            setThisUser(null);
        });
    }

    useEffect(() => {
        confirmResetToken();
    }, []);

    function submitResetPassword() {
        console.log("we are in submitResetPassword");
        if (!resetPassword) {
            console.log("Please enter a new password.");
            window.alert("Please enter a new password.");
        } else {
            fetch('http://localhost:4000/login-router/resetPassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({thisUser, resetPassword}),
            }).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    console.log("back from successful reset password");
                    window.alert("Password reset. Please login to continue.")
                } else {
                    console.log("Failed reset password");
                    window.alert("Failed to reset password.");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    function handleResetPasswordChange(e) {
        setResetPassword(e.target.value);
        console.log(resetPassword);
        return resetPassword;
    }

    return (
        <Form className="reset-password-form-div">
            <h2>Reset Password</h2>
            <br/>
            <Form.Group>
                <Form.Label>New password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    onChange={handleResetPasswordChange}
                    value={resetPassword}>
                </Form.Control>
            </Form.Group>

            <div className="reset-password-form-buttons">
                <Button variant="primary" onClick={submitResetPassword}>
                    Reset password
                </Button>
            </div>
        </Form>
    )
}

export default ResetPassword