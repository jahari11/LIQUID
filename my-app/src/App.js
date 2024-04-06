import React from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Shop from './Pages/Shop'
import ItemDetails from './Pages/itemdetails/ItemDetails'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Confirmation from './Pages/checkout/Confirmation'
import CartMenu from './Component/CartMenu'

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
      <Routes>
      <Route path='/' index element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='item/:itemId' element= {<ItemDetails />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/checkout-success' element={<Confirmation />} />
      </Routes>
      <CartMenu />
      </BrowserRouter>
    </div>
  )
}

export default App
