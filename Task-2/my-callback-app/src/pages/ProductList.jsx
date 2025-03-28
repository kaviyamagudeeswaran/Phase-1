import { Link } from "react-router-dom";
import "../styles/styles.css";
import laptopImg from "../assets/laptop.webp";
import phoneImg from "../assets/smartphones.jpg";
import headphonesImg from "../assets/headphones.jpg";

const products = [
  { id: 1, name: "Laptop", price: "₹82,999", image: laptopImg },
  { id: 2, name: "Smartphone", price: "₹48,999", image: phoneImg },
  { id: 3, name: "Headphones", price: "₹5,499", image: headphonesImg },
];

const ProductList = () => {
  return (
    <div className="container">
      <h2>Home &gt; Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="product-card"
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-img"
            />
            <h3>{product.name}</h3>
            <p className="price">{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
