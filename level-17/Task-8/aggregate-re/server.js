const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoute = require("./routes/productRoute");

dotenv.config();
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/products", productRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
