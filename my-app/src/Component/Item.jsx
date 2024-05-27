import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { Spa } from '@mui/icons-material';

const ItemDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/products/${productId}?populate=image`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { attributes } = product;
  const { title, price, description, size = [], image } = attributes;
  const imageUrl = `http://localhost:1337${image.data.attributes.formats.medium.url}`;
  const handleSizeClick = (size) => {
    setSelectedSize(size)
  }

  return (
    <Box className="item-details">
      <img src={imageUrl} alt={title} />
      <div className='item-details-2'>
      <h1 className='p-t'>{title}</h1>
      <p className='p-d'>{description}</p>
      <p className='p-p'>Price: ${price}</p>
      <div className='size-container'>
        <h3 className='sizes'>Sizes:</h3>
        <div className='size'>
        {size.length === 0 || (size.length === 1 && size[0] === "One Size") ? (
            <p>One Size</p>
          ) : (
            size.map((s, index) => (
              <span
                key={index} 
                className={selectedSize === s.size ? 'size-button selected' : 'size-button'} 
                onClick={() => handleSizeClick(s.size)}
              >
                {s.size}
              </span>
            ))
          )}
        </div>
      </div>
      </div>
    </Box>
  );
};

export default ItemDetails;

