import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import ProductList from "../components/ProductList";
import "./../styles/grid.css";

const Search = () => {
  const [searchParams] = useSearchParams();

  const filters = {
    searchTerm: searchParams.get("searchTerm") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  };

  return (
    <div className="page-container">
      <h1>Search Products</h1>
      <SearchForm />
      <ProductList filters={filters} />
    </div>
  );
};

export default Search;
