import React from 'react'
import './Slide.css'
import { Carousel } from 'antd';

function Slide() {

  return (
    <>
    <Carousel  autoplay>
        <div className='Slide1'>
        </div>
        <div className='Slide2'>
        </div>
        <div className='Slide1'>
        </div>
        <div className='Slide2'>
        </div>
        <div className='Slide2'>
        </div>
    </Carousel>,
    </>
  )
}

export default Slide