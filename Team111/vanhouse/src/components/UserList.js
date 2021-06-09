import {Card,Button,Container,Row,Col} from 'react-bootstrap';
import {useState} from 'react';
import user1 from '../assets/img1.jpg';
import user2 from '../assets/img2.jpg';
import user3 from '../assets/img3.jpg';
function UserList(){
    const [uname,setName] = useState(["asd","qwe","zxc"]);
    const [userimg,setImg] = useState([user1,user2,user3]);
    var cardList = uname.map((item,index)=>{
            const style = {
                width:'100%',
                borderRadius:'50%'
            }
            return(
                <Row style={{marginTop:'10px'}}>
                   <Col lg={3} md={3}><img style={style} src={userimg[index]} /></Col> 
                   <Col lg={6} md={6}><h5>{item}</h5></Col>
                   <Col lg={3} md={3}><Button variant="primary" onClick={()=>handleDelete(index)}>-</Button></Col>
                </Row>
            )
    })
    const [list,setList] = useState(cardList);
    const handleDelete = (i) =>{
        var tn = uname;
        var ti = userimg;
        tn.splice(i,1);
        ti.splice(i,1);
        
        setName(tn);
        setImg(ti);
        //console.log("user:",uname);
        cardList = uname.map((item,index)=>{
            const style = {
                width:'100%',
                borderRadius:'50%'
            }
            return(
                <Row style={{marginTop:'10px'}}>
                   <Col lg={3} md={3}><img style={style} src={userimg[index]} /></Col> 
                   <Col lg={6} md={6}>{item}</Col> 
                   <Col lg={3} md={3}><Button variant="primary" onClick={()=>handleDelete(index)}>-</Button></Col>
                   
                </Row>
                
                    
                    

            )
        })
        setList(cardList);
    }

    const boxStyle = {
        boxShadow:'0 8px 20px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.1)',
        borderRadius:'3px',
        paddingBottom:'10px',
        height:'92vh'
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