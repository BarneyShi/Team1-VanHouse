import { getDefaultNormalizer } from '@testing-library/react';
import { Dropdown ,MenuItem,Input} from 'bootstrap';
import React,{useState}from 'react'
import PropTypes from 'prop-types'
import {InputGroup, Button, FormControl, DropdownButton,ButtonToolbar} from 'react-bootstrap';
import search from '../assets/search.png';
import '../styles/searchbar.css';

function SearchBar(props){
    const [leftState,setLeftState] = useState(0);
    const [Click,setClick] = useState(props)

    const handleSelect = (e) => {
      setLeftState(Number(e.target.value));
    }
    console.log("click:");
    console.log(Click.getData);
    return(
        <div className="style">
            <InputGroup className="mb-3">
                <FormControl className="searchInput" placeholder="Input keyword"/>
                <InputGroup.Append>
                  
                    <select onChange={(e)=>handleSelect(e)}>
                      <option value="1">All categories</option>
                      <option value="2">Price</option>
                      <option value="3">Location</option>
                    </select>
                    <Button variant="outline-secondary" onClick={Click.getData(leftState)}>
                        <img src={search} alt="Search" className="imgstyle"/>
                    </Button>
                </InputGroup.Append>
            </InputGroup>


            
        </div>
    )
}



export default SearchBar;