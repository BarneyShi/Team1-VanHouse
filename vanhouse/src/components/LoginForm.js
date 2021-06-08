import React, {useState} from "react";
import RegistrationForm from "./RegistrationForm"
import "./login.css"

function LoginForm(props) {
    const [details, setDetails] = useState({name: "", email: "", password: ""});
    const [isVisible, setIsVisible] = useState(false);


    const submitHandler = e => {
        e.preventDefault();
        props.Login(details);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Login</h2>
                {(props.error != "") ? (<div className="error">{props.error}</div>) : ""}
                <div className="form-group">
                    {/*<label htmlFor="name">Name: </label>*/}
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        onChange={e => setDetails({...details, name: e.target.value})}
                        value={details.name}
                    />
                </div>
                <div className="form-group">
                    {/*<label htmlFor="email">Email: </label>*/}
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={e => setDetails({...details, email: e.target.value})}
                        value={details.email}
                    />
                </div>
                <div className="form-group">
                    {/*<label htmlFor="password">Password: </label>*/}
                    <input
                        type="text"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={e => setDetails({...details, password: e.target.value})}
                        value={details.password}
                    />
                </div>
                <input type="submit" className="button" value="LOGIN"/>
                {/*<button className="button" onClick={submitHandler}>LOGIN</button>*/}
                <br/>
                <br/>
                <button
                    className="button"
                    onClick={(e) => setIsVisible(!isVisible)}>
                    Register for a new account
                </button>
                {isVisible &&
                <RegistrationForm
                    setEmail={props.setEmail}
                    emailError={props.emailError}
                    setPassword={props.setPassword}
                    passwordError={props.passwordError}
                    setConfirmPassword={props.setConfirmPassword}
                    confirmPasswordError={props.confirmPasswordError}
                />}
            </div>
        </form>
    )
}

export default LoginForm
