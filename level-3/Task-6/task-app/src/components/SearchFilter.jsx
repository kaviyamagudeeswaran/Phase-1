import React, { useState } from "react";
import "../index.css";

const items = [
  { id: 1, name: "Apple", category: "Fruit" },
  { id: 2, name: "Banana", category: "Fruit" },
  { id: 3, name: "Carrot", category: "Vegetable" },
  { id: 4, name: "Broccoli", category: "Vegetable" },
  { id: 5, name: "Grapes", category: "Fruit" },
];

const SearchFilter = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category)
  );

  return (
    <div className="container">
      <h2>Search & Filter Items</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="dropdown"
      >
        <option value="All">All</option>
        <option value="Fruit">Fruit</option>
        <option value="Vegetable">Vegetable</option>
      </select>

      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li key={item.id} className="list-item">
              {item.name} - <span>{item.category}</span>
            </li>
          ))
        ) : (
          <p className="no-results">No items found</p>
        )}
      </ul>
    </div>
  );
};

export default SearchFilter;
