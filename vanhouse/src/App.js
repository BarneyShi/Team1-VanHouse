import { BrowserRouter as Router, Route } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import PostCollection from "./components/PostCollection";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <h3>VanHouse</h3>
        <PostCollection/>
        <Route path="/post/:id">
          <PostDetail />
        </Route>
      </div>
    </Router>
  );
}

export default App;
