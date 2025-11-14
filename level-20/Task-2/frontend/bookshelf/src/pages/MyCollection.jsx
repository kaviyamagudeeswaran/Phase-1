import React from "react";
import BookList from "../components/BookList";

const MyCollection = ({ collection, onUpdateBook }) => {
  return (
    <div className="container mt-4">
      <h2>My Collection</h2>
      <BookList books={collection} onUpdate={onUpdateBook} />
    </div>
  );
};

export default MyCollection;
