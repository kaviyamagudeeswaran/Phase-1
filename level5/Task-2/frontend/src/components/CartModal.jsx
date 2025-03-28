import React from "react";
import "./CartModal.css";

const CartModal = ({ cart, onClose }) => {
  const totalAmount = cart.reduce((sum, product) => sum + product.price, 0);
  const discount = totalAmount > 500 ? 50 : 0; 
  const finalAmount = totalAmount - discount;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🛒 Payment Details</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ₹{item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p>
          <b>Total Amount:</b> ₹{totalAmount.toFixed(2)}
        </p>
        <p>
          <b>Discount Applied:</b> ₹{discount.toFixed(2)}
        </p>
        <p>
          <b>Final Payable Amount:</b> ₹{finalAmount.toFixed(2)}
        </p>
        <button className="checkout-btn">Proceed to Pay</button>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal;
