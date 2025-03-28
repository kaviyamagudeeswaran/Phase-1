import { useParams, Link } from "react-router-dom";
import "../styles/styles.css";
import laptopImg from "../assets/laptop.webp";
import phoneImg from "../assets/smartphones.jpg";
import headphonesImg from "../assets/headphones.jpg";

const products = [
  {
    id: 1,
    name: "Laptop",
    price: "₹82,999",
    image: laptopImg,
    description: "Powerful laptop for work & gaming.",
  },
  {
    id: 2,
    name: "Smartphone",
    price: "₹48,999",
    image: phoneImg,
    description: "Latest smartphone with high-end features.",
  },
  {
    id: 3,
    name: "Headphones",
    price: "₹5,499",
    image: headphonesImg,
    description: "Noise-canceling wireless headphones.",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return (
    <div className="container">
      <h2>
        <Link to="/" className="breadcrumb">
          Home
        </Link>{" "}
        &gt;
        <Link to="/products" className="breadcrumb">
          {" "}
          Products
        </Link>{" "}
        &gt; {product.name}
      </h2>
      <div className="product-detail">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-img"
        />
        <div>
          <h2>{product.name}</h2>
          <p className="price">{product.price}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
