import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container,Row,Col} from 'react-bootstrap';
import PostDetail from "./components/PostDetail";
import Header from "./components/Header";
import UserList from './components/UserList';
import "./App.css";
import PostCollection from "./components/PostCollection";

function App() {

    return (
        <Router>
            <div className="App">
                <Header/>
                         
                <Route exact path="/">
                 <Container fluid>
                    <Row id="AppMainRow">
                        <Col lg={3} md={3}><UserList /></Col>
                        <Col>      
                    <PostCollection/>
                
                </Col>
                    </Row>
                </Container>
                </Route>
                <Route path="/post/:id">
                    <PostDetail/>
                </Route>
            </div>
        </Router>
    );
}


export default App;
