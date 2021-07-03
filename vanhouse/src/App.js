import React, {useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import PostDetail from "./components/PostDetail/PostDetail";
import Header from "./components/Header";
import UserList from "./components/UserList";
import Price from './components/Price';
import Location from './components/Location';
import Category from './components/Category';
import "./App.css";
import PostCollection from "./components/PostCollection";

function App() {
  const [filterIdx, setFilterIdx] = useState(Number(0));

  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/">
          <Container fluid>
            <Row id="AppMainRow">
              <Col lg={3} md={3}>
              {
                ((filterIdx === 0) && <UserList />) ||
                ((filterIdx === 1) && <Category /> ) ||
                ((filterIdx === 2) && <Price />) ||
                ((filterIdx === 3) && <Location />)
              }
              </Col>
              <Col>
                <PostCollection setSearchFilter={ (i) => {setFilterIdx(i);}} />
              </Col>
            </Row>
          </Container>
        </Route>
        <Route path="/post/:id">
          <PostDetail />
        </Route>
      </div>
    </Router>
  );
}

export default App;
