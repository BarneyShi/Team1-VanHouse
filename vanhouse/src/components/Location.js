import React,{useState}from 'react'
import {Button} from 'react-bootstrap'
import '../style.css'

function Location(){
    
    const boxStyle = {

        boxShadow:'0 8px 20px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.1)',
        borderRadius:'3px',
        paddingBottom:'10px',
        height:'90vh',
        paddingLeft:'10px'
    }

    const width = {
        width:'80%',
        marginTop:'10px'
    }

    return(
        <div style={boxStyle}>
            <h2 className="h2">Location:</h2>
            <Button style={width} bsStyle="primary" block>Vancouver</Button>
            <Button style={width} bsStyle="primary" block>Richmond</Button>
            <Button style={width} bsStyle="primary" block>Burnaby</Button>
            
        </div>
    )
}

export default Location;