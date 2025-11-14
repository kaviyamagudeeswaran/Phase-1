import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="thank-you-container">
      <h2>Thank you for logging in!</h2>
      <Link to="/home">
        <Button variant="primary">Go to Home</Button>
      </Link>
    </div>
  );
}

export default ThankYou;
