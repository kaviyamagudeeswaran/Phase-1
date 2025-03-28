import React from "react";

const products = [
  { id: 1, name: "Laptop", category: "electronics", price: 1000 },
  { id: 2, name: "Sofa", category: "furniture", price: 500 },
  { id: 3, name: "T-Shirt", category: "clothing", price: 20 },
];

const ProductList = ({ filters }) => {
  const filteredProducts = products.filter((product) => {
    return (
      (filters.searchTerm === "" ||
        product.name
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase())) &&
      (filters.category === "" || product.category === filters.category) &&
      (filters.minPrice === "" ||
        product.price >= parseInt(filters.minPrice)) &&
      (filters.maxPrice === "" || product.price <= parseInt(filters.maxPrice))
    );
  });

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
