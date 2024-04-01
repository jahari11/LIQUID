import React from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";
const Item = ({item, width}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [isHovered, setisHovered] = useState(false);

    if (!item || !item.attributes) {
        return null;
    }

    const { category, price, name, image } = item.attributes;

    if (!image || !image.data) {
        return null;
      }


      const { formats } = image.data.attributes || {};

      const url = formats?.medium?.url; 
    

  return (
    <Box className="item-container" style={{ width: width }}>
      <Box
        className="image-container"
        onMouseOver={() => setisHovered(true)}
        onMouseOut={() => setisHovered(false)}
      >
        {/* Render placeholder image if url is missing */}
        {url ? (
          <img
            alt={item.name}
            src={`http://localhost:1339${url}`}
            onClick={() => navigate(`/item/${item.id}`)}
          />
        ) : (
          <div>No Image Available</div>
        )}
      </Box>

      <Box onClick={() => navigate(`/item/${item.id}`)} className="details">
        <span>{name}</span>
        <span>${price}</span>
      </Box>
    </Box>
  )}
export default Item;