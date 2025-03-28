import React from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = ({ cart }) => {
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <h2 className="empty-cart">Cart is empty. Please add a product first.</h2>
    );
  }

  const product = cart[0]; // Get the first product
  const discount = product.price > 500 ? 50 : 0;
  const finalAmount = product.price - discount;

  return (
    <div className="payment-container">
      <h2>💳 Payment Details</h2>
      <div className="payment-card">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="payment-image"
        />
        <h3>{product.name}</h3>
        <p>
          <b>Original Price:</b> ₹{product.price.toFixed(2)}
        </p>
        <p>
          <b>Discount:</b> ₹{discount}
        </p>
        <p>
          <b>Final Price:</b> ₹{finalAmount.toFixed(2)}
        </p>
        <button className="pay-btn">Proceed to Pay</button>
        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Shopping
        </button>
      </div>
    </div>
  );
};

export default Payment;
