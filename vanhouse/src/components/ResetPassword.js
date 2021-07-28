import React, {useEffect} from "react";
import PropTypes from "prop-types";
import "../styles/login.css"
import {Button, Form} from "react-bootstrap";


function ResetPassword({
                           handleResetPasswordChange,
                           resetPassword,
                           handleCloseResetPassword,
                           submitResetPassword,
                           setUser
                       }) {

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
                        setUser(dbUser); // only setting this to re-render component automatically
                        console.log("verified user with token");
                        console.log(dbUser);
                    });
            }
        }).catch(() => {
            console.log("Could not verify token.");
            setUser(null);
        });
    }

    useEffect(() => {
        confirmResetToken();
    }, []);

    return (
        <Form>
            <h2>Reset Password</h2>
            <br/>
            <br/>
            <div className="form-group">
                <input
                    type="password"
                    name="resetPassword"
                    id="resetPassword"
                    placeholder="Type new password"
                    onChange={handleResetPasswordChange}
                    value={resetPassword}
                />
            </div>

            <div className="reset-password-form-buttons">
                <Button className="reg-close-button" variant="secondary" onClick={handleCloseResetPassword}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitResetPassword}>
                    Reset password
                </Button>
            </div>
        </Form>
    )
}

ResetPassword.defaultProps = {}

ResetPassword.propTypes = {
    handleResetPasswordChange: PropTypes.func,
    resetPassword: PropTypes.string,
    handleCloseResetPassword: PropTypes.func,
    submitResetPassword: PropTypes.func,
    setUser: PropTypes.func
};

export default ResetPassword