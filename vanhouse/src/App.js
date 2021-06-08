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
    return (
        <Router>
            <div className="App">
                <Header/>

                <PostCollection/>
                <Route path="/post/:id">
                    <PostDetail/>
                </Route>
                    {/*{(user.email != "") ? (*/}
                    {/*    <div className="welcome">*/}
                    {/*        <h2> Welcome, <span>{user.name}</span></h2>*/}
                    {/*        <button onClick={Logout}>Logout</button>*/}
                    {/*    </div>*/}
                    {/*) : (*/}
                    {/*    <LoginForm*/}
                    {/*        Login={Login}*/}
                    {/*        error={error}*/}
                    {/*        RegistrationForm={RegistrationForm}*/}
                    {/*        setEmail={setEmail}*/}
                    {/*        emailError={emailError}*/}
                    {/*        setPassword={setPassword}*/}
                    {/*        passwordError={passwordError}*/}
                    {/*        confirmPassword={confirmPassword}*/}
                    {/*        setConfirmPassword={setConfirmPassword}*/}
                    {/*        confirmPasswordError={confirmPasswordError}*/}
                    {/*    />*/}
                    {/*)}*/}
            </div>
        </Router>
    );
}

export default App;
