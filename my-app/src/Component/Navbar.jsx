import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import LOGO from '../assets/LOGO.png'
import { IconButton } from '@mui/material'
import { MenuOutlined } from '@mui/icons-material'
import { ThemeContext } from '@mui/styled-engine';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-container">
    <div className='navbar'>
      <div className="navbar-logo">
        <Link>
        <img src={LOGO} alt="" />
        </Link>
      </div>
      <div className={`navbar-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <MenuOutlined />
      </div>
      <div className={`navbar-menu ${isOpen ? 'open' : 'closed'}`}>
        <ul>
        <Link to="/"><span>Home</span></Link>
        <Link to="/about"><span>About</span></Link>
        <Link to="/shop"><span>Shop</span></Link>
        <Link to="/contact"><span>Contact</span></Link>
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Navbar
