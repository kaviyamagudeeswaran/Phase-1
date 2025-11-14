const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const app = express();
const PORT = 3000;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Failed:", err));
app.get("/user-schema", (req, res) => {
  res.send(User.schema.obj); 
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
