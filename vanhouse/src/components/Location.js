import React,{useState}from 'react'
import {Button} from 'react-bootstrap'
import UserList from './UserList';
import '../style.css'

function Location(){
    const [state,setState] = useState(0);



    if(state === 0){
        return(
        <div className="boxStyle">
            <h2 className="h2">Location:</h2>
            <Button className="width" bsStyle="primary" block>Vancouver</Button>
            <Button className="width" bsStyle="primary" block>Richmond</Button>
            <Button className="width" bsStyle="primary" block>Burnaby</Button>
            <div className="divStyle">
                <Button bsStyle="primary" onClick={()=>setState(1)}>Cancel</Button>
            </div>
            
        </div>
        )
    }

    return(
        <UserList />
    )
    
}

export default Location;