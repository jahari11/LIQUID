import React from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Shop from './Pages/Shop'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
      <Routes>
      <Route path='/' index element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/contact' element={<Contact />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
