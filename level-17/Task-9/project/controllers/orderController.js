const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("../middlewares/asyncHandler");

exports.createOrder = asyncHandler(async (req, res, next) => {
  const { userId, products } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let totalAmount = 0;
    const productUpdates = [];

    for (const item of products) {
      const product = await Product.findById(item.product).session(session);
      if (!product) throw new AppError("Product not found", 404);
      if (product.stock < item.quantity)
        throw new AppError(`Insufficient stock for ${product.name}`, 400);
      totalAmount += product.price * item.quantity;
      product.stock -= item.quantity;
      productUpdates.push(product.save({ session }));
    }

    const order = new Order({ user: userId, products, totalAmount });
    await order.save({ session });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { purchaseHistory: order._id },
      },
      { session }
    );

    await Promise.all(productUpdates);
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ status: "success", order });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(error);
  }
});
