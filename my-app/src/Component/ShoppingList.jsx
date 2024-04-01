import React, { useEffect, useState } from 'react'
import { UseDispatch, useDispatch, useSelector } from 'react-redux'
import {Box, useMediaQuery} from '@mui/material'
import Item from './Item'
import { setItems } from '../state/index.js'

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('all')
    const items = useSelector((state) => state.cart.items);


    async function getItems() {
        const items = await fetch('http://localhost:1339/api/items?populate=image',
        {method: "GET"}
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data))
    }

    useEffect(()=> {
        getItems();
    }, []);
  return (
    <Box className = 'shopping-list'>
        <Box className='shopping-list-title'>
        <span>STORE</span>
        </Box>
        <Box className='shopping-list-items'>
       {items.map((item) => (
          <Item item={item} key={`${item.name}-${item.name}-${item.id}`} />
        ))}
        </Box>
    </Box>
  )
}

export default ShoppingList