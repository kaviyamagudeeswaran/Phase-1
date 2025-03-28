import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css"; 

const CartPage = ({ cart }) => {
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">
          Your cart is empty.
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/")}
          >
            Back to Shop 🛍️
          </button>
        </p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {item.name} - ₹{item.price}
                </span>
              </li>
            ))}
          </ul>

          {/* Payment Details Section */}
          <div className="card p-3 mb-3">
            <h4>💳 Payment Details</h4>
            <p>
              Total Amount: <strong>₹{totalPrice}</strong>
            </p>
          </div>

          {/* Offers Section */}
          <div className="card p-3 mb-3">
            <h4>🎉 Offers Available</h4>
            <ul>
              <li>10% Cashback on Credit Cards</li>
              <li>Free Delivery on orders above ₹1000</li>
              <li>Buy 2 Get 1 Free on selected items</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <button
              className="btn btn-success me-3"
              onClick={() => alert("Proceeding to Payment...")}
            >
              Proceed to Buy ✅
            </button>
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              Back to Shop 🛍️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
