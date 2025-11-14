const express = require("express");
const {
  getProductStats,
  searchProduct,
  filterProducts,
  avgPriceByCategory,
  complexQuery,
} = require("../controllers/productController");

const router = express.Router();

// Routes
router.get("/stats", getProductStats);
router.get("/search", searchProduct); // Search Product by Name
router.get("/filter", filterProducts);
router.get("/average", avgPriceByCategory);
router.get("/complex", complexQuery);

module.exports = router;
