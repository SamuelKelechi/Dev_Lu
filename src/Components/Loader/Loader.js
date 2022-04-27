import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import Ayomi from '../Image/ayomi9.jpg'

const Loader = ({ type, color }) => (
    <>
    <Main>
        <Contain>
            <Hero></Hero>
            <h2>Welcome!</h2>
            <div>My Birthday</div>
            <div>Special App</div>
            <ReactLoading type={"bars"} color={"#F4F4FE"} height={100} width={100} /> 
        </Contain>
    </Main>
    </>
);

export default Loader;

const Main = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content:center;
    background-color: #252559;
`
const Contain = styled.div`
    width: 50%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #4D459B;

    h2{
        color: #F4F4FE;
        font-size: 25px;
    }

    div{
        color: #F4F4FE;
        font-weight: bold;
    }

    @media screen and (max-width: 1025px){
        width: 70%;
    }

    @media screen and (max-width: 650px){
        width: 90%;
    }
`
const Hero = styled.div`
    height: 450px;
    /* margin-top: 20px; */
    width: 90%;
    background: url(${Ayomi});
    background-position: center;
    background-size: cover;
    /* background-repeat: no-repeat; */
    border-radius: 0 0 20px 20px;

    @media screen and (max-width: 650px){  
        height: 300px;
    }
`