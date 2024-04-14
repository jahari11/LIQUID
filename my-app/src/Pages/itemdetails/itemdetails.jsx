import { useParams } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";

import Navbar from "../../Component/Navbar";


const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    const item = await fetch(
      `http://localhost:1339/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
    if (itemJson.data && itemJson.data.attributes && itemJson.data.attributes.image) {
      setSelectedImage(itemJson.data.attributes.image[0]);
    }
  }

  async function getItems() {
    const items = await fetch(
      `http://localhost:1339/api/items?populate=image`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]);

  async function getItem() {
    const item = await fetch(
      `http://localhost:1339/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch(
      `http://localhost:1339/api/items?populate=image`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]);

  const handleSizeChange = (size) => {
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
    };
  
  
  
    const sizes = item && item.attributes && item.attributes.size ? (
      item.attributes.size.map((size, index) => (
        <button
          key={index}
          onClick={() => handleSizeChange(size.name)}
          className={`size-option ${selectedSize === size.name ? 'selected' : ''}`}
        >
          {size.name}
        </button>
      ))
    ) : (
      <p>One Size</p>
    );
  

  return (
    <div className="item-page">
      <Navbar />
      <Box className="item-details-container" m="80px auto">
        <Box className="item-actions-container">
          {/* IMAGES */}
          <Box className="item-images-container">
            <img
              alt={item?.name}
              src={`http://localhost:1339${item?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
            />
          </Box>

          

          {/* ACTIONS */}
          <Box className="item-actions">
            <Box className="item-info">
              <span className="name">{item?.attributes?.name}</span>
              <span className="price">${item?.attributes?.price}</span>
              <span className="description">{item?.attributes?.shortDescription}</span>
            </Box>

            <div className="size-options">
              {sizes}
            </div>

            <Box className="item-quantity">
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Box>
            <Button sx={{
              color:'white',
              backgroundColor: 'rgb(38, 122, 38)',
              '&:hover': {
                  backgroundColor: 'black', 
                  color: 'rgb(38, 122, 38)', 
              }
            }} className="add-to-cart-button"
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            ><span>ADD TO CART</span>
            </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ItemDetails;
