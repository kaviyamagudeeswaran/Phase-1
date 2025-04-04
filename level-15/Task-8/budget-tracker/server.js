import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import transactionsRoutes from "./routes/transactions.js";
import goalsRoutes from "./routes/goals.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Budget Tracker API is running...");
});

// API Routes
app.use("/api/transactions", transactionsRoutes);
app.use("/api/goals", goalsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
