import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>📰 My Blog</h1>
      <Link to="/">🏠 Home</Link>
    </nav>
  );
};

export default Navbar;
