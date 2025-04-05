const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// In-memory database (Array)
let products = [
  { id: 1, name: "Laptop", price: 50000, description: "Gaming Laptop" },
  { id: 2, name: "Phone", price: 20000, description: "Smartphone" },
];

// Get All Products
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

// Get Single Product
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Create New Product
app.post("/products", (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update Product
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.status(200).json(products[index]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Delete Product
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.status(200).json({ message: "Product deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
