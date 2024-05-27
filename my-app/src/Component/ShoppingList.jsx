import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Box} from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const items = useSelector((state) => state.cart.items);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:1337/api/products?populate=image');
          setProducts(response.data.data);
        } catch (error) {
          console.error('Error fetching products:', error)
        }
      }
      fetchProducts();
    }, [])
  return (
    <Box className = 'shopping-list'>
        <Box className='shopping-list-title'>
        <span>STORE</span>
        </Box>
        <Box className='shopping-list-items'>
       {products.map((product)=> (
        <li key={product.id}>
          <Link to={`/shop/${product.id}`}>
          <img className='product-img'
                src={`http://localhost:1337${product.attributes.image.data.attributes.formats.small.url}`} 
                alt={product.attributes.title} 
              />
          <h2 className='product-t'>{product.attributes.title}</h2>
          <p className='product-p'>${product.attributes.price}</p>
          </Link>
        </li>
       ))}
        </Box>
    </Box>
  )
}

export default ShoppingList