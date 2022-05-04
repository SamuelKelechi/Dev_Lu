import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { addDoc, collection, Timestamp, query, orderBy, onSnapshot} from 'firebase/firestore';
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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Ayomi1 from './Image/ayomi1.jpg';
import Flip from './Slide/Flip';


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

    const Post = (e) => {
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
                            
                            <span><label>Select Your Image</label><ArrowForwardIcon style={{marginTop:'-6px'}}/><input accept='image/*' onChange={(e)=>handleImageChange(e)} style={{width: '100px'}} type='file'/></span> 
                         
                            <input name='name' value={formData.name}  onChange={(e)=>handleChange(e)} placeholder='Please, Input Your Name'/>
                            <textarea   name='message' value={formData.message}  onChange={(e)=>handleChange(e)} placeholder='Write me a Birthday Wish'/>

                            {progress === 0 ? null : (
                                <div style={{ width: `${progress}%`, fontSize:'14px'}}>
                                    {`Sending Message... ${progress}%`}
                                </div>
                            )}
                            
                            <button disabled={!formData.message} onClick={()=>{
                                Post();
                            }}>
                                Send Message
                            </button>

                        </InputHold>

                        {toggle1 ? (
                        <>
                        <div onClick={Switch2} style={{marginBottom:'-5px', cursor:'pointer', marginTop:'10px', border:'1px solid white', padding:'5px', borderRadius:'5px'}}>BACK TO GALLERY</div>
                        
                        <CardHolder>
                           {wish.map((props) => (
                                <Cards key={props.id}>
                                    <Avatar src={props.image} alt={props.name.charAt(0)}/>
                                    <Contents>
                                        <MessageName style={{textAlign:'left', marginBottom:'-8px', marginLeft:'-1px'}}>{props.name} <p style={{marginBottom:'-3px',textAlign:'left', fontSize:'13px',  textTransform:"capitalize"}}> {moment(props.createdAt.toDate()).fromNow()}</p></MessageName>
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
                                <Flip />
                            </FlipHolder>
                        </>
                        )

                        }

                   </>
                ):(
                    <>
                        <button onClick={Switch}>Send me a Wish</button>
                        <InputHold>
                            <Type>SUPPORT MY DREAM</Type>
                            <Line style={{marginTop:'-2px'}}></Line>
                            My Dream is to become a proficient software engineer. Currently I am on the path to become 
                            a full stack developer through the CodeLab scholarship program i am undergoing. In order to 
                            achieve my dream, i will be writing three professional exams which will certify me as a software
                            engineer. I'm Currently fund raising 200,000 (Two Hundred Thousand Naira), to achieve my Dream, 
                            and i am calling for everyones support. Gift me your support for my Birthday and allow me be accountable to you.
                            God Bless You as you support me to achieve my dream. Below is my account details. Thanks in Anticipation.
                            <Line style={{marginTop:'-2px'}}></Line>                                                                                                                                                                                                                                                                                                                                                                             
                            <Account>
                                <h2 style={{color:'white'}}>Bank: UBA</h2>
                                <h3 style={{color:'white'}}>Acct. Name: Anozie Silverline Chidera</h3>
                                <h3 style={{color:'white'}}>Acct. Number: 2133598584</h3>
                            </Account>
                        </InputHold>
                    </>
                )
                }

                <Connect>
                    <h3 style={{color:'white', marginBottom:'-1px', padding:'5px'}}>Connect with</h3>

                    <span>
                        <a href='https://web.facebook.com/luciana.chidera' target='_blank'>
                            <FacebookIcon />
                        </a>

                        <a
                            href="https://wa.me/2348121759954"
                            className="whatsapp_float"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <WhatsAppIcon />
                        </a>
                        
                        <a href='https://github.com/Anozieluciana' target='_blank'>
                            <GitHubIcon />
                        </a>

                        <a href='#' target='_blank'>
                            <LinkedInIcon />
                        </a>

                        <a href='#' target='_blank'>
                            <TwitterIcon />
                        </a>
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
    background: linear-gradient(to right top, #202C33, #252959);
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
    background: url(https://img.freepik.com/free-vector/realistic-happy-birthday-black-golden_1361-3241.jpg?t=st=1651151892~exp=1651152492~hmac=62b949cc0fb3e1df3e8ff8a946f21c871b5d111186e9aeaaf0d13114c13bc131&w=740);
    /* background: url(https://img.freepik.com/free-vector/realistic-birthday-background_52683-42214.jpg?w=2000); */
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
    border: 3px solid white;
    background-color: whitesmoke;
    object-fit: cover;
    object-position: top;
    margin-top: 15px;
    margin-bottom:3px;

    :hover{
        width: 160px; 
        height: 160px;
        margin-top: 50px;
        transition: all 0.9s ease-in-out;
    }

    @media screen and (max-width: 650px){
        width: 150px;
        height: 150px;

        :hover{
        width: 150px; 
        height: 150px;
        margin-top: 15px;
        transition: none;
    }
    }

`

const Name = styled.div`
    font-size: 22px;
    font-weight: bold;
    color: white;
    background-color: #252559;
    width: 190px;
    text-align: center;
    border-radius: 4px;

    @media screen and (max-width: 650px){
    font-size: 18px;
    }
`

const BirthDate = styled.div`
    width: 140px;
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
                color: #DF4C67;
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
        height: 35px;
    }

    span{
        display: flex;
        align-items: center;
        height: 50px;
    }

    input{
        height: 40px;
        margin-top: 8px;
        outline: none;
        border-radius: 5px;
        font-size: 16px;
        width: 90%;
        color: black;
    }

    textarea{
        margin-top: 8px;
        margin-bottom: 8px;
        height: 80px;
        outline: none;
        border-radius: 5px;
        padding-top: 10px;
        font-size: 20px;
        width: 90%;
        color: black;
    }

    @media screen and (max-width: 650px){
        width: 90%;
    }
    @media screen and (max-width: 330px){
        label{
            height: 30px;
            font-size: 14px;
        }
    }
`
const Type = styled.div`
	font-weight: bold;
	width: 195px;
	animation: typing 5s steps(30, end), blink-caret 0.80s step-end infinite;
	animation-iteration-count: infinite;
	white-space: nowrap;
	overflow: hidden;
	border-right: 2px solid;

    @keyframes typing {
			from {
				width: 0;
			}
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
    border-radius: 8px;
    width: 80%;
    height: 500px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 15px;

    @media screen and (max-width: 650px){
        width: 95%;
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

    h3{
        font-size: 18px;
    }

    span{
        width: 100%;
        display: flex;
        justify-content: space-around;

        a{
            text-decoration: none;
            color: inherit;
            cursor: pointer;
        }
    }
`
const Avatar = styled.img`
    width: 22%;
    height: 100px;
    /* background-color: blue; */
    border-radius: 15px;
    border: 1px solid white;
    font-size: 40px;
    object-fit: cover;
    object-position: top;

    @media screen and (max-width: 650px){
        height: 80px;
        width: 20%;
        border-radius: 8px;
    }
`
const Account = styled.div`
    color: white;
    h2{   
        color: white;
    }
    h3{
        color: white,
    }
`

const Contents = styled.div`
    width: 75%;
    color: white;
    display: flex;
    flex-direction: column;
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
const Line = styled.div`
    width: 90px;
    border: 1px solid white;
`