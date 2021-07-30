import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import NotAuthorized from './components/Admin/NotAuthorized';
import PostDetail from "./components/PostDetail/PostDetail";
import Header from "./components/Header";
import UserList from "./components/UserList";
import "./App.css";
import PostCollection from "./components/PostCollection";
import ResetPassword from "./components/ResetPassword";
import AccountDetails from "./components/AccountDetails";

function App() {
  const [user, setUser] = useState();
  const [filterIdx, setFilterIdx] = useState(Number(0));
  const [reset, setReset] = useState(false);
  const [filterURL, setFilterURL] = useState("");
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect( async ()=> {
    try {
      const response = await fetch(
          "/login-router/account",
          {
            credentials: "include",
          }
      );
      if (!response.ok) {
        throw new Error("Not logged in");
      }
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setUser();
      console.log("Errow while checking auth:", err.message);
    }
  },[])

  return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/">
            <Container fluid>
              <Row id="AppMainRow">
                <Col lg={3} md={3}>
                  <UserList setReset={setReset}
                            setQuery={setFilterURL}
                            setUserId={setUserId}
                  />
                </Col>
                <Col>
                  <PostCollection filterURL={filterURL}
                                  userId={userId}
                                  setSearchFilter={(i) => {
                                    setFilterIdx(i);
                                    setReset(true);
                                  }}
                                  appPosts={posts}
                                  setAppPosts={setPosts}
                                  setQuery={setFilterURL}
                  />
                </Col>
              </Row>
            </Container>
          </Route>
          <Route path="/post/:id">
            <PostDetail />
          </Route>
          <Route path="/admin">
            {user?.admin ? <Admin />: <NotAuthorized />}
          </Route>
          <Route path="/login-router/resetPassword/:token">
            <ResetPassword />
          </Route>
          <Route path="/login-router/account">
            <AccountDetails />
          </Route>
        </div>
      </Router>
  );
}

export default App;
