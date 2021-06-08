import {BrowserRouter as Router, Route} from "react-router-dom";
import {useState} from "react";
import PostDetail from "./components/PostDetail";
import LoginForm from "./components/LoginForm";

import "./App.css";
import useSignUp from "./components/useSignUp";

function App() {
    const testUser = {
        email: "test@test.com",
        password: "test123"
    }

    const [user, setUser] = useState({name: "", email: ""});
    const [error, setError] = useState("");
    const {isShowing, toggle} = useSignUp();

    const Login = details => {
        console.log(details);

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
                <h3>VanHouse</h3>

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
                        isShowing={isShowing}
                        toggle={toggle}
                    />
                )}
            </div>
        </Router>
    );
}

export default App;
