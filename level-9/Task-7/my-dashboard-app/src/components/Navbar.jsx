import React from "react";
import { Link } from "react-router-dom";
import "./../styles/animations.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
    </nav>
  );
};

export default Navbar;
