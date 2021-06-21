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
import "./App.css";
import PostCollection from "./components/PostCollection";
import search from './assets/search.png';

function App() {
  const [leftState,setLeftState] = useState(0);
  const [left,setLeft] = useState(<UserList />);

  const style = {
    display: 'flex',
    margin:'auto',
    textAlign: 'center',
    width:'70%'


}
  const render = (i)=>{
    switch(Number(i)){
      case 0:setLeft(<UserList />);break;
      case 1:setLeft(<Category />);break;
      case 2:setLeft(<Price />);break;
      case 3:setLeft(<Location />);break;
      default:break;
    }
    console.log(left);
  }


const imgstyle = {
    height: '20px',
    weight: '15px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign: 'center',


}


const handleSelect = (e) => {
    setLeftState(Number(e.target.value));
}

  const handleClick = ()=>{
    render(leftState);
  }



    

    

    return (
      <Router>
            
      <div className="App">
          <Header/>
          <div style={style}>
            <InputGroup className="mb-3">
                <FormControl placeholder="Input keyword"/>
                <InputGroup.Append>
                  
                    <select onChange={(e)=>handleSelect(e)}>
                      <option value="1">All category</option>
                      <option value="2">Price</option>
                      <option value="3">Location</option>
                    </select>
                    <Button variant="outline-secondary" onClick={()=>handleClick()}>
                        <img src={search} alt="Search" style={imgstyle}/>
                    </Button>
                </InputGroup.Append>
            </InputGroup>


            
        </div>
          <Route exact path="/">
           <Container fluid>
              <Row>
                  <Col lg={3} md={3}>{left}</Col>
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
