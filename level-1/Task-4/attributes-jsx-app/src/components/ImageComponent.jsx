import flowerImage from "../assets/flower.jpg"; // Updated image import
import "./../index.css"; // Import global styles

const ImageComponent = () => {
  return (
    <div className="image-container">
      <h3>Beautiful Flower</h3>
      <img src={flowerImage} alt="A beautiful flower" className="image-style" />
    </div>
  );
};

export default ImageComponent;
