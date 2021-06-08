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
                <Route exact path="/">
                    <PostCollection/>
                </Route>
                <Route path="/post/:id">
                    <PostDetail/>
                </Route>
            </div>
        </Router>
    );
}

export default App;
