import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { searchBooks } from "../api";

const Home = ({ onAddBook }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");

    try {
      const results = await searchBooks(query);
      setBooks(results);
    } catch (err) {
      setError("Failed to fetch books. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <BookList books={books} onAdd={onAddBook} />
    </div>
  );
};

export default Home;
