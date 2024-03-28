import React from 'react'
import Header from './Navbar'
import playdead from '../assets/playdead.mp4'

const FrontFace = () => {
  return (
    <div className="landing-page">
      <video className='video-bg' autoPlay loop muted>
        <source src={playdead} type='video/mp4' />
      </video>
      <div className="landing-page-content">
        <Header />
      </div>
    </div>
  )
}

export default FrontFace