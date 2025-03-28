import React from "react";

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <h4>{product.title}</h4>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default React.memo(ProductItem);
