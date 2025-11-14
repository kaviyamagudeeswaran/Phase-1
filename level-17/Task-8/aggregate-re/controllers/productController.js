const Product = require("../models/Product");

// Aggregation for product statistics
const getProductStats = async (req, res) => {
  const stats = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        totalProducts: { $sum: 1 },
        totalStock: { $sum: "$stock" },
        avgPrice: { $avg: "$price" },
      },
    },
  ]);
  res.json(stats);
};

// Text Search
const searchProduct = async (req, res) => {
  const { keyword } = req.query;
  const products = await Product.find({ $text: { $search: keyword } });
  res.json(products);
};

// Complex Query with multiple conditions
const filterProducts = async (req, res) => {
  const products = await Product.find({
    price: { $gt: 50 },
    stock: { $gt: 5 },
  }).sort({ price: -1 });
  res.json(products);
};

// Average price by category
const avgPriceByCategory = async (req, res) => {
  const avgPrice = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        avgPrice: { $avg: "$price" },
      },
    },
  ]);
  res.json(avgPrice);
};

// Complex Aggregation Query
const complexQuery = async (req, res) => {
  const products = await Product.aggregate([
    { $match: { price: { $gte: 50 } } },
    { $sort: { price: -1 } },
    {
      $project: {
        name: 1,
        price: 1,
        category: 1,
        stock: 1,
      },
    },
  ]);
  res.json(products);
};

module.exports = {
  getProductStats,
  searchProduct,
  filterProducts,
  avgPriceByCategory,
  complexQuery,
};
