import React from 'react'
import { Box, Divider, IconButton, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { removeFromCart, increaseCount, decreaseCount, setIsCartOpen } from '../state/index.js'
import { useNavigate } from 'react-router-dom'

const CartMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state)=> state.cart.cart);
    const isCartOpen = useSelector((state)=> state.cart.isCartOpen)

    const totalPrice = cart.reduce((total,item)=> {
        return total + item.count * item.attributes.price
    }, 0)

    return (
        <Box
            className="modal-overlay"
            display={isCartOpen ? "block" : 'none'}
            backgroundColor= "rgba(0,0,0, 0.4)"
            position="fixed"
            zIndex={1000}
            width="100%"
            height="100%"
            left="0"
            top="0"
            overflow="auto"
        >
            <Box
                className="modal"
                position="fixed"
                right="0"
                bottom="0"
                width="max(400px, 30%)"
                height="100%"
                backgroundColor= "white"
            >
                <Box 
                    padding="30px" 
                    overflow="auto"
                    height="100%"
                >
                    <Box
                    display='flex'
                    justifyContent='space-between'
                    alignContent='center'
                    mb='15px'>
                        <h3>Shopping Bag ({cart.length})</h3>
                        <IconButton onClick={() => dispatch(setIsCartOpen(false))}>
                            <CloseIcon  />
                        </IconButton>
                    </Box>
                    <Box>
                        {cart.map((item) => (
                            <Box key={`${item.attributes.name}-${item.id}`}>
                                <Box 
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    p="15px 0"
                                >
                                    <Box flex="1 1 40%">
                                        <img 
                                            alt={item?.name}
                                            width="123px"
                                            height="164px"
                                            src={`http://localhost:1339${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                                        />
                                    </Box>
                                    <Box flex="1 1 60%">
                                        <Box 
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            mb="5px"
                                        >
                                            <span>{item.attributes.name}</span>
                                            <IconButton onClick={()=> dispatch(removeFromCart({ id: item.id }))}>
                                                <CloseIcon />
                                            </IconButton>
                                        </Box>
                                        <Box
                                            m="15px 0"
                                            display= "flex"
                                            justifyContent= "space-between"
                                            alignItems= "center"
                                        >
                                            <Box
                                                justifyContent="space-between"
                                                display="flex"
                                                alignItems="center"
                                                border={`1.5px solid red`}
                                            >
                                                <IconButton
                                                    onClick={()=> dispatch(decreaseCount({ id: item.id}))}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <span>{item.count}</span>
                                                <IconButton
                                                    onClick={()=> dispatch(increaseCount({ id: item.id}))}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                            <span>${item.attributes.price}</span>
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider />
                            </Box>
                        ))}
                    </Box>
                    <Box m="20px 0">
                        <Box
                            m="20px 0"
                            display= "flex"
                            justifyContent= "space-between"
                            alignItems= "center"
                        >
                            <span>Subtotal</span>
                            <span>${totalPrice}</span>
                        </Box>
                        <Button
                            sx={{
                                backgroundColor:'black',
                                color:'white',
                                borderRadius:0,
                                minWidth: "100%",
                                padding: "20px 40px",
                                m:"20px 0",
                                color:'white',
                                '&:hover': {
                                color: 'rgb(38, 122, 38)',
                                backgroundColor: 'black'

                        }
                            }}
                            onClick={()=> {
                                navigate("/checkout")
                                dispatch(setIsCartOpen(false))
                            }}
                        >
                            Checkout
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CartMenu
