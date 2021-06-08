import React from "react";

import "./login.css"

function RegistrationForm(props) {
    // https://codesandbox.io/s/403r19kl47?file=/src/styles.css:0-30
    // Accessed June 7, 2021
    return (
        <form>
            <div className="form-inner">
                <h2>Register to comment, post, and more!</h2>
                {(props.error != "") ? (<div className="error">{props.error}</div>) : ""}
                <div className="form-group">
                    {/*<label htmlFor="email">Email: </label>*/}
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={e => props.setEmail(e.target.value)}
                        value={props.email}
                    />
                        <div className="error">{props.emailError}</div>
                </div>
                <div className="form-group">
                    {/*<label htmlFor="password">Password: </label>*/}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={e => props.setPassword(e.target.value)}
                        value={props.password}
                    />
                </div>
                <div className="form-group">
                    {/*<label htmlFor="confirmPassword">Confirm password: </label>*/}
                    <input
                        type="password"
                        name="password"
                        placeholder="Confirm password"
                        onChange={e => props.setConfirmPassword(e.target.value)}
                        value={props.confirmPassword}
                    />
                    <div className="error">{props.confirmPasswordError}</div>
                </div>
                <input type="button" className="button" value="REGISTER"/>
            </div>
        </form>
    )
}

export default RegistrationForm
