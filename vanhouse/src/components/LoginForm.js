import React, {useState} from "react";
import SignUpForm from "./SignUpForm"

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
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={e => setDetails({...details, name: e.target.value})}
                        value={details.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={e => setDetails({...details, email: e.target.value})}
                        value={details.email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        onChange={e => setDetails({...details, password: e.target.value})}
                        value={details.password}
                    />
                </div>
                <input type="submit" value="LOGIN"/>
                <button onClick={(e) => setIsVisible(!isVisible)}>Register for a new account</button>
                {isVisible && <SignUpForm/>}
            </div>
        </form>
    )
}

export default LoginForm
