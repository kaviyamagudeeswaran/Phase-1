const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);

// DB Connect
mongoose
  .connect("mongodb://localhost:27017/relateDB")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Start Server
app.listen(4000, () => {
  console.log("Server Running on port 4000");
});
