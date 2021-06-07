import { BrowserRouter as Router, Route } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import "./App.css";

function App() {
    const testUser = {
        email: "test@test.com",
        password: "test123"
    }

    const [user, setUser] = useState({name: "", email: ""});
    const [error, setError] = useState("");

    const Login = details => {
        console.log(details);
    }

    const Logout = () => {
        console.log("Logout");
    }

  return (
    <Router>
      <div className="App">
        <h3>VanHouse</h3>

        <Route path="/post/:id">
          <PostDetail />
        </Route>
      </div>
    </Router>
  );
}

export default App;
