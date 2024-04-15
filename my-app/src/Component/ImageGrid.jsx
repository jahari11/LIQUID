import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from '@mui/material';
import { addToCart } from '../state/index.js';
import { useDispatch } from 'react-redux';


const ImageGrid = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:1339/api/items/${itemId}?populate=*`);
        const selectedItem = response.data.data;
        setItem(selectedItem);
        // Check if the selected size exists in the item's size array
        if (selectedItem.attributes.size) {
          const initialSelectedSize = selectedItem.attributes.size.find(size => size.name === selectedSize);
          if (initialSelectedSize) {
            setSelectedSize(initialSelectedSize.name);
          }
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleSizeChange = (size) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='item-details-container'>
        <div className="item-images-container">
          <img src={`http://localhost:1339${item?.attributes?.image?.data?.attributes?.formats?.small?.url}`} alt='main-image' />
        </div>
        <div className="item-details">
          <div className="item-info">
            <h2 className='item-name'>{item.attributes.name}</h2>
            <p className='item-descript'>{item.attributes.shortDescription}</p>
            <p className='item-price'>Price: ${item.attributes.price}</p>
            {item.attributes.size.map(size => (
              <button 
                key={size.name}
                onClick={() => handleSizeChange(size.name)} 
                className={`size-options ${selectedSize === size.name ? 'selected' : ''}`}
              >
                {size.name}
              </button>
            ))}
          </div>
          <div className="item-quantity">
            <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
              <RemoveIcon />
            </IconButton>
            <span>{count}</span>
            <IconButton onClick={()=> setCount(count + 1)}>
              <AddIcon />
            </IconButton>
          </div>
          <div>
            <button className='atc-btn' onClick={()=> dispatch(addToCart({item: {...item,count }}))}>Add to cart</button>
          </div>
        </div>
      </div>
      <div className='image-grid'>
            {item.attributes.imageGrid.data && item.attributes.imageGrid.data.map((image, index) => (
              <img key={index} src={`http://localhost:1339${image.attributes.formats.small.url}`} alt={`Additional Image ${index + 1}`} />
            ))}
      </div>
    </div>
  );
};

export default ImageGrid;


