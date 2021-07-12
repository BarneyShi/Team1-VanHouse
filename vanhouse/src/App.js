import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Category from "./components/Category";
import Header from "./components/Header";
import Location from "./components/Location";
import PostCollection from "./components/PostCollection";
import PostDetail from "./components/PostDetail";
import Price from "./components/Price";
import UserList from "./components/UserList";

function App() {
  const [filterIdx, setFilterIdx] = useState(Number(0));
  const [reset, setReset] = useState(false);
  const [filterPost, setFilterPost] = useState();
  // const [storePost, setStorePost] = useState();

  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/">
          <Container fluid>
            <Row id="AppMainRow">
              <Col lg={3} md={3}>
                {(filterIdx === 0 && (
                  <UserList
                    setReset={setReset}
                    setFilterPost={setFilterPost}
                  />
                )) ||
                  (filterIdx === 1 && (
                    <Category
                      setReset={setReset}
                      setFilterIdx={setFilterIdx}
                      setFilterPost={setFilterPost}
                    />
                  )) ||
                  (filterIdx === 2 && (
                    <Price
                      setReset={setReset}
                      setFilterIdx={setFilterIdx}
                      setFilterPost={setFilterPost}
                    />
                  )) ||
                  (filterIdx === 3 && (
                    <Location
                      setReset={setReset}
                      setFilterIdx={setFilterIdx}
                      setFilterPost={setFilterPost}
                    />
                  ))}
              </Col>
              <Col>
                <PostCollection
                  filterIdx={filterIdx}
                  reset={reset}
                  setReset={setReset}
                  setFilterPost={setFilterPost}
                  filterPost={filterPost}
                  setSearchFilter={(i) => {
                    setFilterIdx(i);
                    setReset(true);
                    console.log(reset);
                  }}
                />
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
