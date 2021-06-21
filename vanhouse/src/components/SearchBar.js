import { Dropdown ,MenuItem,Input} from 'bootstrap';
import React from 'react'
import {InputGroup, Button, FormControl, DropdownButton,ButtonToolbar} from 'react-bootstrap';
import search from '../assets/search.png';

function SearchBar(){
    const style = {
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          textAlign: 'center',


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
      alert(e.target.value);
    }
    return(
        <div style={style}>
            <InputGroup className="mb-3">
                <FormControl placeholder="Input keyword"/>
                <InputGroup.Append>
                  
                    <select onChange={(e)=>handleSelect(e)}>
                      <option value="1">All category</option>
                      <option value="2">Price</option>
                      <option value="3">Location</option>
                    </select>
                    <Button variant="outline-secondary">
                        <img src={search} alt="Search" style={imgstyle}/>
                    </Button>
                </InputGroup.Append>
            </InputGroup>


            
        </div>
    )
}

export default SearchBar;