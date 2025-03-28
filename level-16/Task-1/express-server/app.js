const express = require("express");
const app = express();

// a route 
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
