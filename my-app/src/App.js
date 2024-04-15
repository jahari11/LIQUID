import React from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Shop from './Pages/Shop'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Confirmation from './Pages/checkout/Confirmation'
import CartMenu from './Component/CartMenu'
import ItemDetails from './Pages/productdetails/ItemDetails'

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
      <Routes>
      <Route path='/' index element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='item/:itemId' element={<ItemDetails />} />
      <Route path='/checkout-success' element={<Confirmation />} />
      </Routes>
      <CartMenu />
      </BrowserRouter>
    </div>
  )
}

export default App
