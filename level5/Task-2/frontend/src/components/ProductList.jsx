import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";

const ProductList = ({ products, setCart }) => {
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart([product]); // Store only 1 product for now
    navigate("/payment"); // Navigate to payment page
  };

  return (
    <div className="product-list">
      <h2>🛒 Products</h2>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>₹{product.price.toFixed(2)}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
