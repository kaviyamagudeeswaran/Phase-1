// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            🛒 ecommerence Clone
          </Link>
          <Link className="btn btn-warning" to="/cart">
            Cart ({cart.length})
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} />} />
      </Routes>
    </Router>
  );
};

export default App;
