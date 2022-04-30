import React from 'react'
import { CCarousel } from '@coreui/react'
import { CCarouselItem } from '@coreui/react'
import {CImage}  from '@coreui/react' ;
import '@coreui/coreui/dist/css/coreui.min.css';

import slide1 from '../Image/ayomi1.jpg'
import slide2 from '../Image/ayomi3.jpg'
import slide3 from '../Image/ayomi4.jpg'
import slide4 from '../Image/ayomi5.jpg'
import slide5 from '../Image/ayomi6.jpg'
import slide6 from '../Image/ayomi8.jpg'
import slide7 from '../Image/ayomi9.jpg'
import slide8 from '../Image/ayomi10.jpg'
import slide9 from '../Image/ayomi11.jpg'
import slide10 from '../Image/ayomi12.jpg'
import slide11 from '../Image/ayomi13.jpg'
import slide12 from '../Image/ayomi14.jpg'


const Flip = () => {
  return (
    <>
  <CCarousel style={{height: 'inherit', width: '100%', borderRadius:'8px'}}  >
{/* 
    <CCarouselItem style={{height: '100%', width: '100%', borderRadius:'8px'}}>
      <CImage style={{height: '100%', width: '100%', objectFit:'cover', objectPosition:'center', borderRadius:'8px'}} src={slide1} />
    </CCarouselItem> */}

    <CCarouselItem style={{height: '100%', width: '100%', borderRadius:'8px'}}>
      <CImage style={{height: '100%', width: '100%', objectFit:'cover', objectPosition:'center', borderRadius:'8px'}} src={slide2} />
    </CCarouselItem>

    <CCarouselItem style={{height: '100%', width: '100%', borderRadius:'8px'}}>
      <CImage style={{height: '100%', width: '100%', objectFit:'cover', objectPosition:'center', borderRadius:'8px'}} src={slide3} />
    </CCarouselItem>

    <CCarouselItem style={{height: '100%', width: '100%', borderRadius:'8px'}}>
      <CImage style={{height: '100%', width: '100%', objectFit:'cover', objectPosition:'center', borderRadius:'8px'}} src={slide4} />
    </CCarouselItem>

    <CCarouselItem style={{height: '100%', width: '100%', borderRadius:'8px'}}>
      <CImage style={{height: '100%', width: '100%', objectFit:'cover', objectPosition:'center', borderRadius:'8px'}} src={slide5} />
    </CCarouselItem>

    <CCarouselItem style={{height: '100%', width: '100%', borderRadius:'8px'}}>
      <CImage style={{height: '100%', width: '100%', objectFit:'cover', objectPosition:'center', borderRadius:'8px'}} src={slide6} />
    </CCarouselItem>

    <CCarouselItem style={{height: '100%', width: '100%', borderRadius:'8px'}}>
      <CImage style={{height: '100%', width: '100%', objectFit:'cover', objectPosition:'center', borderRadius:'8px'}} src={slide7} />
    </CCarouselItem>

    <CCarouselItem style={{height: '100%', width: '100%', borderRadius:'8px'}}>
      <CImage style={{height: '100%', width: '100%', objectFit:'cover', objectPosition:'center', borderRadius:'8px'}} src={slide8} />
    </CCarouselItem>

    <CCarouselItem style={{height: '100%', width: '100%', borderRadius:'8px'}}>
      <CImage style={{height: '100%', width: '100%', objectFit:'cover', objectPosition:'center', borderRadius:'8px'}} src={slide9} />
    </CCarouselItem>

    <CCarouselItem style={{height: '100%', width: '100%', borderRadius:'8px'}}>
      <CImage style={{height: '100%', width: '100%', objectFit:'cover', objectPosition:'center', borderRadius:'8px'}} src={slide10} />
    </CCarouselItem>

    <CCarouselItem style={{height: '100%', width: '100%', borderRadius:'8px'}}>
      <CImage style={{height: '100%', width: '100%', objectFit:'cover', objectPosition:'center', borderRadius:'8px'}} src={slide11} />
    </CCarouselItem>

    <CCarouselItem style={{height: '100%', width: '100%', borderRadius:'8px'}}>
      <CImage style={{height: '100%', width: '100%', objectFit:'cover', objectPosition:'center', borderRadius:'8px'}} src={slide12} />
    </CCarouselItem>

  </CCarousel>
    </>
  )
}

export default Flip