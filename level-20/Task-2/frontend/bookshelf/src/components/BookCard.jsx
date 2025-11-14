// src/BookCard.jsx
import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const BookCard = ({ book, onAdd, onUpdate }) => {
  const [category, setCategory] = React.useState(book.category || "");
  const [rating, setRating] = React.useState(book.rating || "");
  const [note, setNote] = React.useState(book.note || "");

  const navigate = useNavigate(); // Initialize navigate

  const handleSave = () => {
    onUpdate({ ...book, category, rating, note });
  };

  const handleAddToCollection = () => {
    onAdd(book);
    alert(`${book.title} has been added to your collection!`); // Show the alert with the book title
    navigate("/thank-you"); // Navigate to the thank-you page
  };

  const defaultThumbnail =
    "https://via.placeholder.com/150x200.png?text=No+Image";

  return (
    <Card style={{ width: "18rem", margin: "1rem" }}>
      <Card.Img
        variant="top"
        src={book.thumbnail ? book.thumbnail : defaultThumbnail}
        alt={book.title}
      />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          <small className="text-muted">{book.authors?.join(", ")}</small>
        </Card.Text>

        {onAdd ? (
          <Button variant="primary" onClick={handleAddToCollection}>
            Add to My Collection
          </Button>
        ) : (
          <>
            <Form.Group className="mt-2">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Read">Read</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Want to Read">Want to Read</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Personal Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" className="mt-3" onClick={handleSave}>
              Save
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookCard;
