const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // To serve static files like form.html

// Serve HTML Form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/form.html");
});

// Handle Form Submission
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.send("<h2>Error: All fields are required!</h2>");
  }

  res.send(`
    <h2>Form Submitted Successfully!</h2>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Message: ${message}</p>
  `);
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
