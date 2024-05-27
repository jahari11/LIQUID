import React from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import Login from './Pages/Login'
import Shop from './Pages/Shop'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Confirmation from './Pages/checkout/Confirmation'
import CartMenu from './Component/CartMenu'
import ItemDetails from './Pages/productdetails/ItemDetails'
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'

const client = new ApolloClient({
  uri:'http://localhost:4500/graphql',
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <ApolloProvider client={client}>
    <div className='app'>
      <BrowserRouter>
      <Routes>
      <Route path='/' index element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/shop' element={<Shop />} />
      <Route path = '/login' element={<Login />} />
      <Route path='/shop/:productId' element={<ItemDetails />} />
      <Route path='/checkout-success' element={<Confirmation />} />
      </Routes>
      <CartMenu />
      </BrowserRouter>
    </div>
    </ApolloProvider>
  )
}

export default App
