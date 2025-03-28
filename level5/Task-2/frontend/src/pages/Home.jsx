// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css"; // Import custom styles

const products = [
  {
    id: 1,
    name: "Laptop",
    imageUrl: "/images/laptop.jpg",
    price: 59999,
    description: "Powerful gaming laptop with i7 processor.",
  },
  {
    id: 2,
    name: "Headphones",
    imageUrl: "/images/Headphones.jpg",
    price: 24999,
    description: "Noise-cancelling wireless headphones.",
  },
  {
    id: 3,
    name: "Smartwatch",
    imageUrl: "/images/Smartwatch.jpg",
    price: 4999,
    description: "Waterproof smartwatch with health tracking.",
  },
  {
    id: 4,
    name: "Smartphone",
    imageUrl: "/images/Smartphone.jpg",
    price: 19999,
    description: "Latest 5G smartphone with AMOLED display.",
  },
];

const Home = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart([...cart, product]);
    navigate("/cart");
  };

  return (
    <div className="home-container">
      <h2 className="title">🛒 Explore Top Deals!</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-description">{product.description}</p>
              <h5 className="product-price">₹{product.price}</h5>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
