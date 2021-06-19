import {Card,Button,Container,Row,Col} from 'react-bootstrap';
import React, {useState} from 'react';
import user1 from '../assets/img1.jpg';
import user2 from '../assets/img2.jpg';
import user3 from '../assets/img3.jpg';


function UserList(){
    const [uname,setName] = useState(["user1","user2","user3"]);
    const [userimg,setImg] = useState([user1,user2,user3]);
    let cardList = uname.map((item,index)=>{
            const style = {
                width:'35px',
                borderRadius:'100%',
                display: 'flex',
                alignItems: 'center'
            }
            const ButtonStyle = {
                display: 'flex',
                alignItems: 'center'

            }
            return(
                <Row style={{display: 'flex', alignItems: 'center'}}>  
                   <Col xs={3} md={3}><img style={style} alt='User avatar' src={userimg[index]} /></Col> 
              
                   <Col xs={3} md={3}> <text style={{display: 'flex', alignItems: 'center',fontSize: '20px'}}> {uname[index]} </text> </Col>
                
      
                   

                   
                   
    
                </Row>
            )
    })
    const [list,setList] = useState(cardList);
    const handleDelete = (i) =>{
        const tn = uname;
        const ti = userimg;
        tn.splice(i,1);
        ti.splice(i,1);
        
        setName(tn);
        setImg(ti);
        // console.log("user:",uname);
        cardList = uname.map((item,index)=>{
            const style = {
                width:'35px',
                borderRadius:'100%',
                display: 'flex',
                alignItems: 'center'
            }

            const buttonStyle = {
                display: 'flex',
                alignItems: 'center'

            }
            return(
                <Row style={{display: 'flex', alignItems: 'center'}}>
                   <Col xs={3} md={3}><img style={style} alt='User avatar' src={userimg[index]} /></Col> 
                   
                   <Col xs={3} md={3}> <text style={{display: 'flex', alignItems: 'center'}}> {uname[index]} </text> </Col>
                  
                   <Col xs={3} md={3}><Button variant="outline-primary" size="sm" style={buttonStyle} onClick={()=>handleDelete(index)}>-</Button></Col>

                   
     

                             
                </Row>
                
                    
                    

            )
        })
        setList(cardList);
    }

    const boxStyle = {

        boxShadow:'0 8px 20px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.1)',
        borderRadius:'3px',
        paddingBottom:'10px',
        height:'90vh'
    }

    return(
        <div style={boxStyle}>
            <h2>User List</h2>
            <Container fluid>
                {list}
            </Container>
            
        </div>
    )
}

export default UserList;

