import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { addDoc, collection, Timestamp, query, orderBy, onSnapshot, getDocs} from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import { storage, db } from '../Base';
import { toast } from 'react-toastify';
import moment from 'moment';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Ayomi from './Image/ayomi8.jpg';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Back from './Image/birthday2.jpg';
import Ayomi1 from './Image/ayomi1.jpg'



const Birthday = () => {
    const [toggle, setToggle] = useState(true);
    const [toggle1, setToggle1] = useState(false);
    const [wish, setWish] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        message: "",
        image: "",
        createdAt: Timestamp.now().toDate(),
    });
    
    const [progress, setProgress] = useState(0);
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };
    
    const handleImageChange = (e) => {
        setFormData({...formData, image:e.target.files[0]})
    };

    const Switch = () => {
        setToggle(!toggle)
    };

    const Switch2 = () => {
        setToggle1(!toggle1)
    };

    const Post = () => {
        const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
    
        const uploadImage = uploadBytesResumable(storageRef, formData.image)
        uploadImage.on("state_changed",
        (snapshot) => {
            const progressPercent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
            );
            setProgress(progressPercent);
        },
        (err) => {
            console.log(err)
        },
        ()=>{
            setFormData({
                name:'',
                message:'',
                image:'',
            });
            getDownloadURL(uploadImage.snapshot.ref)
            .then((url) => {
                const articleRef = collection(db, "message");
                addDoc(articleRef, {
                    name: formData.name,
                    message: formData.message,
                    image: url,
                    createdAt: Timestamp.now().toDate(),
                })
                .then(() => {
                    toast("Your Birthday Wish Sent Successfully", {type: "success"});
                    setProgress(0);
                })
                .catch(err=>{
                    toast("Error While Sending Birthday Wish", {type: "error"});
                })
            });
        }
        );
    };


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


    useEffect(() => {
        getData();
    }, []);

  return (
    <>
    <MainContainer>
        <Container>
            <HeroHold>
                <Avat src={Ayomi1}/>
                <Name>Anozie Luciana</Name>
                <BirthDate>On Sunday, 01 May</BirthDate>
            </HeroHold>
            <DownHold>
                {toggle ? (
                    <>
                        <button onClick={Switch} style={{width:'50%', height:'45px'}}> Support My Dream</button>
                        <TouchAppIcon/>
                        <InputHold>
                            <marquee>Send me a Special Birthday Message</marquee>
                            <span><label>Select Your Image</label><input accept='image/*' onChange={(e)=>handleImageChange(e)} style={{width: '100px'}} type='file'/></span> 
                            <input name='name' value={formData.name}  onChange={(e)=>handleChange(e)} placeholder='Please, Input Your Name'/>
                            <textarea name='message' value={formData.message}  onChange={(e)=>handleChange(e)} placeholder='Write me a Birthday Wish'/>
                            {progress === 0 ? null : (
                                <div style={{ width: `${progress}%`, fontSize:'14px'}}>
                                    {`Message Sending... ${progress}%`}
                                </div>
                            )}
                            <button  onClick={()=>{
                                Post();
                            }}>Send Message</button>
                        </InputHold>

                        {toggle1 ? (
                        <>
                        <div onClick={Switch2} style={{marginBottom:'-5px', cursor:'pointer', marginTop:'10px', border:'1px solid white', padding:'5px', borderRadius:'5px'}}>BACK TO GALLERY</div>
                        
                        <CardHolder>
                           {wish.map((props) => (
                                <Cards key={props.id}>
                                    <Avatar src={props.image}/>
                                    <Contents>
                                        
                                        <MessageName style={{textAlign:'left', marginBottom:'-5px', marginLeft:'-1px'}}>{props.name} <p style={{marginBottom:'-3px',textAlign:'left', fontSize:'13px',  textTransform:"capitalize"}}> {moment(props.createdAt.toDate()).fromNow()}</p></MessageName>
                                        <p style={{textAlign:'left', fontSize:'14px', fontWeight: 'lighter'}}>{props.message}</p>
                                    </Contents>
                                    <p style={{width:'15px'}}><FavoriteIcon/></p>
                                </Cards>
                           ))}
                        </CardHolder>
                        </>
                        ):(
                        <>
                        <div onClick={Switch2} style={{cursor:'pointer', marginTop:'10px', border:'1px solid white', padding:'5px', borderRadius:'5px'}}>BIRTHDAY MESSAGES</div>
                     
                            <FlipHolder >  
                            </FlipHolder>
                        </>
                        )

                        }

                   </>
                ):(
                    <>
                        <button onClick={Switch}>Send me a Wish</button>
                        <InputHold>
                            SUPPORT MY DREAM
                            <p>My Dream is to become a proficient software engineer</p>
                        </InputHold>
                    </>
                )
                }

                <Connect>
                    <h3 style={{color:'white'}}>Connect with</h3>
                    <span>
                    <FacebookIcon />
                    <WhatsAppIcon />
                    <GitHubIcon />
                    <LinkedInIcon />
                    <TwitterIcon />
                    </span>
                </Connect>
              
            </DownHold>
        </Container>
    </MainContainer>
        
    </>
  )
};

export default Birthday;

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
        width: 95%;
    }
`
const HeroHold = styled.div`
    height: 300px;
    width: 95%;
    background: url(${Back});
    background-size: cover;
    background-position: center;
    margin-top: 20px;
    border-radius: 40px 40px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 650px){
        height: 300px; 
        margin-top: 10px;
        width: 98%;
    }
`

const Avat = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 100%;
    border: 2px solid white;
    background-color: whitesmoke;
    object-fit: cover;
    object-position: center;
    margin-top: 15px;

    :hover{
        width: 160px; 
        height: 160px;
        margin-top: 30px;
        transition: all 0.9s ease-in-out;
    }

    @media screen and (max-width: 650px){
        width: 150px;
        height: 150px;
    }

`

const Name = styled.div`
    font-size: 22px;
    font-weight: bold;
    color: white;
    background-color: #252559;
    width: 180px;
    text-align: center;
    border-radius: 4px;

    @media screen and (max-width: 650px){
    font-size: 18px;
    }
`

const BirthDate = styled.div`
    width: 130px;
    text-align: center;
    color: white;
    background-color: #252559;
`

const DownHold = styled.div`
    width: 95%;
    height: auto;
    min-height: 40vh;
    background-color: #252559;
    margin-top: 20px;
    margin-bottom: 10px;
    border-radius: 8px 8px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0 10px 0;
    box-shadow: 0px 4px 4px 4px rgba(225, 225, 225, 0.5);

    button{
            margin: 5px;
            padding: 8px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            /* border: 0.5px solid #EB5646; */
            background-color: #DF4C67;
            color: white;
            box-shadow: 0px 4px 6px 2px rgba(225, 225, 225, 0.5);


            :hover{
                color: blue;
                background-color: lightgray;
            }
    };

    div{
        font-size: 18px;
        font-weight: bold;
        margin: 5px;
        text-align: center;
    };

    @media screen and (max-width: 650px){
        margin-top: -80px;
        width: 98%;
        border-radius: 40px 40px 0 0;
    };
`

const InputHold = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    padding: 5px;

    label{
        font-weight: bold;
        margin-right: 5px;
    }

    input{
        height: 30px;
        margin-top: 8px;
        outline: none;
        border-radius: 5px;
        /* font-weight: bold; */
        font-size: 16px;
        width: 90%;
    }

    textarea{
        margin-top: 8px;
        margin-bottom: 8px;
        height: 60px;
        outline: none;
        border-radius: 5px;
        padding-top: 20px;
        font-size: 20px;
        width: 90%;
        color: black;
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
        width: 98%;
    }
`

const FlipHolder = styled.div`
    display: flex;
    justify-content: center;
    background-image: url(${Ayomi});
    background-position: center;
    background-size: cover;
    border-radius: 8px;
    width: 80%;
    height: 500px;
    overflow: hidden;

    @media screen and (max-width: 650px){
        width: 90%;
        height: 400px;
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
const Connect= styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;

    span{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

`
const Avatar = styled.img`
    width: 22%;
    height: 100px;
    background-color: white;
    border-radius: 15px;

    @media screen and (max-width: 650px){
        height: 80px;
        width: 20%;
        border-radius: 8px;
    }
`

const Contents = styled.div`
    width: 75%;
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