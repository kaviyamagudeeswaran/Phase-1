import React from "react";
import { FixedSizeList as List } from "react-window";
import ProductItem from "./ProductItem";
import useOptimizedFetch from "../hooks/useOptimizedFetch";

const ProductList = () => {
  const { data: products, isLoading } = useOptimizedFetch(
    "https://fakestoreapi.com/products"
  );

  if (isLoading) return <div>Loading products...</div>;

  return (
    <List height={400} itemCount={products.length} itemSize={50} width="100%">
      {({ index, style }) => (
        <div style={style}>
          <ProductItem product={products[index]} />
        </div>
      )}
    </List>
  );
};

export default React.memo(ProductList);
