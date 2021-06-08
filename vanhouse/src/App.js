import {BrowserRouter as Router, Route} from "react-router-dom";
import {useState, useEffect} from "react";
import PostDetail from "./components/PostDetail";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import usePasswordValidator from "./components/usePasswordValidator";
import RegistrationForm from "./components/RegistrationForm";
import {validateEmail} from "./components/utils";

import "./App.css";
import PostCollection from "./components/PostCollection";

function App() {
    const testUser = {
        email: "test@test.com",
        password: "test123"
    }

    const [user, setUser] = useState({name: "", email: ""});
    const [error, setError] = useState("");


    // https://codesandbox.io/s/403r19kl47?file=/src/styles.css:0-30
    // Accessed June 7, 2021
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

    const Login = details => {
        if (details.email == testUser.email && details.password == testUser.password) {
            setUser({
                name: details.name,
                email: details.email
            });
        } else {
            setError("Invalid email or password");
        }
    }

    const Logout = () => {
        console.log("Logout");
        setUser({name: "", email: ""});
    }

    return (
        <Router>
            <div className="App">
                {/*<h3>VanHouse</h3>*/}
                <Header/>

                <PostCollection/>
                <Route path="/post/:id">
                    <PostDetail/>
                </Route>

            {(user.email != "") ? (
                <div className="welcome">
                    <h2> Welcome, <span>{user.name}</span></h2>
                    <button onClick={Logout}>Logout</button>
                </div>
            ) : (
                <LoginForm
                    Login={Login}
                    error={error}
                    RegistrationForm={RegistrationForm}
                    setEmail={setEmail}
                    emailError={emailError}
                    setPassword={setPassword}
                    passwordError={passwordError}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    confirmPasswordError={confirmPasswordError}
                />
            )}
        </div>
</Router>
);
// import PostCollection from "./components/PostCollection";
// import "./App.css";
//
// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <h3>VanHouse</h3>
//         <PostCollection/>
//         <Route path="/post/:id">
//           <PostDetail />
//         </Route>
//       </div>
//     </Router>
//   );
}

export default App;
