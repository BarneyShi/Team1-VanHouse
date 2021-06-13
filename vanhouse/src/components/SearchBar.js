import React from 'react'
import {InputGroup, Button, FormControl} from 'react-bootstrap';
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
    return(
        <div style={style}>
            <InputGroup className="mb-3">
                <FormControl placeholder="Input keyword"/>
                <InputGroup.Append>
                    <Button variant="outline-secondary">
                        <img src={search} style={imgstyle}/>
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    )
}

export default SearchBar;