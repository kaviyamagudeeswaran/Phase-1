import { Link } from "react-router-dom";
import "../styles/styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>ShopEasy</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
