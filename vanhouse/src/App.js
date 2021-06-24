import React,{useState}from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";
import {InputGroup, Button, FormControl, DropdownButton,ButtonToolbar,Container,Col,Row} from 'react-bootstrap';

import {MenuItem,Dropdown} from 'bootstrap';
import PostDetail from "./components/PostDetail";
import Header from "./components/Header";
import UserList from './components/UserList';
import Price from './components/Price';
import Location from './components/Location';
import Category from './components/Category';
import SearchBar from './components/SearchBar';
import "./App.css";
import PostCollection from "./components/PostCollection";
import search from './assets/search.png';

function App() {
  const [leftState,setLeftState] = useState(1);
  const [left,setLeft] = useState(<UserList />);
  const [ul,setu] = useState(Number(0));
  
  







  function handleClick(i){
    
    console.log("asdasd");
    console.log(i);

    
    setu(i);
  }
  
  
  
  const handleReset = (i)=>{
    
  }

  



    
  if(ul===0||Number(leftState)===0){
    
      return (
        <Router>
              
        <div className="App">
            <Header/>
            <SearchBar getData={(i)=>handleClick(i)}/>
            <Route exact path="/">
              <Container fluid>
                  <Row>
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
  if(ul === 2){
    
    return(
        <Router>
                
          <div className="App">
              <Header/>
              <SearchBar getData={(i)=>handleClick(i)}/>
              <Route exact path="/">
                <Container fluid>
                  <h3></h3>
                    <Row>
                        <Col lg={3} md={3}><Price reset={(i)=>handleReset(i)}/></Col>
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
      )
  }
  if(ul === 3){
    return(
        <Router>
                
          <div className="App">
              <Header/>
              <SearchBar getData={(i)=>handleClick(i)}/>
              <Route exact path="/">
                <Container fluid>
                    <Row>
                        <Col lg={3} md={3}><Location /></Col>
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
      </Router>);
  }
  if(ul===1){
    return(
        <Router>
                
          <div className="App">
              <Header/>
              <SearchBar getData={(i)=>handleClick(i)}/>
              <Route exact path="/">
                <Container fluid>
                    <Row>
                        <Col lg={3} md={3}><Category /></Col>
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
      )
  }
    


    
    

  

}


export default App;
