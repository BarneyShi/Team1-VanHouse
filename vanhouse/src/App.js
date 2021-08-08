import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HashRouter as Router, Route } from "react-router-dom";
import { useTranslation } from 'react-i18next';
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
  const [reset, setReset] = useState(false);
  const [filterURL, setFilterURL] = useState("");
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);

  const { t, i18n } = useTranslation();
  const language = localStorage.getItem("page_language");
  if(language === "cn" && i18n.language !== "cn"){
    i18n.changeLanguage("cn");
  }

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
      console.log("Error while checking auth:", err.message);
    }
  },[])

  return (
      <Router>
        <div className="App">
          <Header updateUser={setUser}/>
          <Route exact path="/">
            <Container fluid>
              <Row id="AppMainRow">
                <Col lg={3} md={3} >
                  <UserList setReset={setReset}
                            setQuery={setFilterURL}
                            setUserId={setUserId}
                  />
                </Col>
                <Col >
                  <PostCollection filterURL={filterURL}
                                  userId={userId}
                                  posts={posts}
                                  setPosts={setPosts}
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
