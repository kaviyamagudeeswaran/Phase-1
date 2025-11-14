import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MyCollection from "./pages/MyCollection";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [collection, setCollection] = useState([]);

  const handleAddBook = (book) => {
    if (!collection.find((b) => b.id === book.id)) {
      setCollection([...collection, book]);
    }
  };

  const handleUpdateBook = (updatedBook) => {
    setCollection((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            BookShelf
          </Link>
          <div>
            <Link className="btn btn-outline-primary me-2" to="/">
              Home
            </Link>
            <Link className="btn btn-outline-secondary" to="/collection">
              My Collection
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home onAddBook={handleAddBook} />} />
        <Route
          path="/collection"
          element={
            <MyCollection
              collection={collection}
              onUpdateBook={handleUpdateBook}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
