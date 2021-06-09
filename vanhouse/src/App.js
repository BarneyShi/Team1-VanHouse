import {BrowserRouter as Router, Route} from "react-router-dom";
import PostDetail from "./components/PostDetail";
import Header from "./components/Header";

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
