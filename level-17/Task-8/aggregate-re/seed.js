const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const seedProducts = async () => {
  await Product.deleteMany();

  const products = [];

  for (let i = 1; i <= 20; i++) {
    products.push({
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 1,
      category: i % 2 === 0 ? "Electronics" : "Clothing",
      stock: Math.floor(Math.random() * 20) + 1,
    });
  }

  await Product.insertMany(products);
  console.log("Products Seeded");
  process.exit();
};

seedProducts();
