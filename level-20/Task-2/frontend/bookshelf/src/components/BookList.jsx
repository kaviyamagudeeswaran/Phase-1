import React from "react";
import BookCard from "./BookCard";
import { Container, Row } from "react-bootstrap";

const BookList = ({ books, onAdd, onUpdate }) => {
  return (
    <Container>
      <Row>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onAdd={onAdd}
            onUpdate={onUpdate}
          />
        ))}
      </Row>
    </Container>
  );
};

export default BookList;
