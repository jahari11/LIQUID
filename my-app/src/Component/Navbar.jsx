import React, {useState} from 'react'
import { UseDispatch, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LOGO from '../assets/LOGO.png'
import { Badge, IconButton } from '@mui/material'
import { MenuOutlined, ShoppingBagOutlined } from '@mui/icons-material'
import { setIsCartOpen } from '../state/index.js'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state)=> state.cart.cart);

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
      <div>
        <Badge
        className='bag-badge'
        badgeContent={cart.length}
        invisible={cart.length === 0}
        sx={{
          "& .MuiBadge-badge": {
            right: 5,
            top: 5,
            padding: "0 4px",
            height: "14px",
            minWidth: "13px",
          },
        }}
        >
        <ShoppingBagOutlined onClick={() => dispatch(setIsCartOpen())} className='navbar-icon-bag' />
        </Badge>
        <MenuOutlined className={`navbar-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu} />
      </div>
      <div className={`navbar-menu ${isOpen ? 'open' : 'closed'}`}>
        <ul>
        <Link to="/"><span>Home</span></Link>
        <Link to="/about"><span>About</span></Link>
        <Link to="/shop"><span>Shop</span></Link>
        <Link to="/contact"><span>Contact</span></Link>
        <Link to="/login"><span>Login</span></Link>
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Navbar
