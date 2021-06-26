import React,{useState}from 'react'
import {Button} from 'react-bootstrap'
import UserList from './UserList';
import '../styles/searchbar.css';

function Price(props){
    const [state,setState] = useState(0);

    
    if(state === 0){
        return(
            <div className="boxStyle">
                <h2 className="h2">Price:</h2>
                <table id="table">
                    <tr>
                        <td>from</td>
                        <td></td>
                        <td>to</td>
                    </tr>
                    <tr>
                        <td><input type="text"/></td>
                        <td>-</td>
                        <td><input type="text"/></td>
                    </tr>
                </table>
                <div className="divStyle">
                    <Button variant="primary">Submit</Button>
                    <Button variant="primary" onClick={()=>setState(1)}>Cancel</Button>
                </div>
                
            </div>
        
        )
    }
    return (
        <UserList />
    )

    
}

export default Price;