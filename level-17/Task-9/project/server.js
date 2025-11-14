const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./middlewares/errorMiddleware"); // Ensure this is the correct file name

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);

// Error Middleware (after all routes)
app.use(errorHandler);

// DB & Server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on port 5000")
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
