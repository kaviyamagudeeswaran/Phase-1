const express = require("express");
const app = express();
const PORT = 3000;

// Serving static files from 'public' directory
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
