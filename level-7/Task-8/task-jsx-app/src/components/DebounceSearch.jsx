import React, { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import "./DebounceSearch.css";

const DebounceSearch = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // 500ms delay

  return (
    <div className="container">
      <h1>Debounced Search</h1>
      <input
        type="text"
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="result">Debounced Query: {debouncedQuery}</p>
    </div>
  );
};

export default DebounceSearch;
