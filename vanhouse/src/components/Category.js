import React,{useState}from 'react'
import {Button} from 'react-bootstrap'
import '../style.css'

function Category(){
    
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

    const style = {
        width:'90%',
        textAlign:'left',
        marginTop:'20px'
    }

    return(
        <div style={boxStyle}>
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

            <h2 className="h2">Location:</h2>
            <Button style={width} bsStyle="primary" block>Vancourer</Button>
            <Button style={width} bsStyle="primary" block>Richmond</Button>
            <Button style={width} bsStyle="primary" block>Burnaby</Button>
            <div style={style}>
                <Button variant="primary">Submit</Button>
            </div>
            
        </div>
    )
}

export default Category;