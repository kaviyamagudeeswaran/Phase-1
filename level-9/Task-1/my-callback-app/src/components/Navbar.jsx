import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">🏠 Home</Link>
        </li>
        <li>
          <Link to="/about">📖 About</Link>
        </li>
        <li>
          <Link to="/contact">📞 Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
