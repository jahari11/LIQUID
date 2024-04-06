import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addToCart } from '../../state/index.js';
import Item from '../../Component/Item.jsx';
import Navbar from '../../Component/Navbar.jsx'


const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [items, setItems] = useState([]);

  async function getItem() {
    const itemResponse = await fetch(
      `http://localhost:1339/api/items/${itemId}?populate=*`,
      { method: "GET" }
    );
    const itemData = await itemResponse.json();
    setItem(itemData.data);
  }

  async function getItems() {
    const itemsResponse = await fetch(
      `http://localhost:1339/api/items?populate=image`,
      { method: "GET" }
    );
    const itemsData = await itemsResponse.json();
    setItems(itemsData.data);
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
    <div className="item-details-container">
      <div className="item-details-content">
        {/* Images */}
        <div className="item-images-container">
          <img
            alt={item?.name}
            src={`http://localhost:1339${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
          />
        </div>

        {/* Actions */}
        <div className="item-actions-container">
          <div className="item-actions">
            <div className="item-info">
              <h3>{item?.attributes?.name}</h3>
              <p>{item?.attributes?.shortDescription}</p>
              <p>${item?.attributes?.price}</p>
            </div>

             {/* Size Options */}
             <div className="size-options">
              {sizes}
            </div>

            <div className="item-quantity">
              <button onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </button>
              <span>{count}</span>
              <button onClick={() => setCount(count + 1)}>
                <AddIcon />
              </button>
            </div>

           

            <div className="add-to-cart-button">
              <button
                onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items */}
      <div className="related-items-container">
        <h3>Related Products</h3>
        <div className="related-items">
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default ItemDetails;
