import {InputGroup, Button, FormControl} from 'react-bootstrap';
import search from '../assets/search.png';

function SearchBar(){
    const style = {
        marginTop:'10px'
    }
    const imgstyle = {
        height:'20px'
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