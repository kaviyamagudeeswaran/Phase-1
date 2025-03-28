const express = require("express");
const usersRouter = require("./routes/users"); // Import the users route

const app = express();
const PORT = 3000;

// Use the users router for /api/users
app.use("/api/users", usersRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
