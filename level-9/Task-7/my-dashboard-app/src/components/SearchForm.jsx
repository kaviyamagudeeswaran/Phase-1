import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(e.target.name, e.target.value);
    setSearchParams(newParams);
  };

  return (
    <div className="search-form">
      <input
        type="text"
        name="searchTerm"
        placeholder="Search products..."
        defaultValue={searchParams.get("searchTerm") || ""}
        onChange={handleInputChange}
      />
      <select
        name="category"
        onChange={handleInputChange}
        defaultValue={searchParams.get("category") || ""}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="furniture">Furniture</option>
        <option value="clothing">Clothing</option>
      </select>
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        defaultValue={searchParams.get("minPrice") || ""}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        defaultValue={searchParams.get("maxPrice") || ""}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchForm;
