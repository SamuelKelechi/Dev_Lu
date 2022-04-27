import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc} from 'firebase/firestore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import moment from 'moment';
import { db } from '../Base';

const Admin = () => {
    
    const [wish, setWish] = useState([]);


    const usersCollectionRef = collection(db, "message")

    const que = query(usersCollectionRef, orderBy("createdAt", "desc"))

    const getData =  () => {
        onSnapshot(que, (snapshot) => {
            const datas = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setWish(datas);
        });
    };

    const Delete = async (id) => {
        const  userDoc = doc(db, "message", id )
        await deleteDoc(userDoc);
    }

    useEffect(() => {
        getData();
    }, []);

  return (
    <>
        <MainContainer>
        <Container>
        <CardHolder>
                           {wish.map((props) => (
                                <Cards key={props.id}>
                                <Avatar src={props.image}/>
                                <Contents>
                                    
                                    <MessageName style={{textAlign:'left', marginBottom:'-12px', marginLeft:'-1px'}}>{props.name} <p style={{color:'#DF4C67', textAlign:'left', fontSize:'13px',  textTransform:"capitalize"}}>{moment(props.createdAt.toDate()).fromNow()}</p></MessageName>
                                    <p style={{textAlign:'left', fontSize:'14px', fontWeight: 'lighter'}}>{props.message}</p>
                                </Contents>
                                <p style={{width:'20px', cursor:'pointer'}} onClick={(() => {
                                    Delete(props.id)
                                })}><DeleteForeverIcon/></p>
                        </Cards>
                           ))}
                        </CardHolder>
        </Container>
         </MainContainer>

    </>
  )
}

export default Admin;


const MainContainer = styled.div`
    width: 100%;
    height: auto;
    min-height: 100vh;
    background: linear-gradient(to right top, #4A4296, #252559);
    display: flex;
    justify-content: center;
`

const Container = styled.div`
    width: 50%;
    background: linear-gradient( to right bottom, #4A4296, #252559);
    border-left: 1px solid whitesmoke;
    border-right: 1px solid whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;

    @media screen and (max-width: 1025px){
        width: 70%;
    }

    @media screen and (max-width: 650px){
        width: 90%;
    }
`

const CardHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    border-radius: 5px;
    padding: 5px;

    @media screen and (max-width: 650px){
        width: 90%;
    }
`
const Cards = styled.div`
    width: 100%;
    height: auto;
    min-height: 100px;
    margin-top: 15px;
    background-color: #4D459B;
    padding:8px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    opacity: 0.9;
    justify-content: space-between;
    box-shadow: 1px 4px 4px 4px rgba(225, 225, 225, 0.3);
`
const Avatar = styled.img`
    width: 22%;
    height: 100px;
    background-color: white;
    border-radius: 15px;

    @media screen and (max-width: 650px){
        height: 80px;
        border-radius: 8px;
    }
`

const Contents = styled.div`
    width: 70%;
    color: white;
    display: flex;
    flex-direction: column;
    /* background-color: green; */
    height: auto;
    min-height: 100px;
`
const MessageName = styled.p`
    text-transform: uppercase;
    width: 100%;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-weight:bold ;
    justify-content: space-between;
    height: 30px;

    @media screen and (max-width: 425px){
        font-size: 15px;
    }
    @media screen and (max-width: 375px){
        font-size: 13.5px;
    }
`