const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/orderController");

router.post("/create", createOrder); // this is the route you’re hitting

module.exports = router;
