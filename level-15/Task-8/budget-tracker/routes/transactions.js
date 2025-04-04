import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// ➤ Add a Transaction (POST)
router.post("/", async (req, res) => {
  try {
    const { type, amount, category, date } = req.body;
    if (!type || !amount || !category || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTransaction = new Transaction({ type, amount, category, date });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: "Error adding transaction" });
  }
});

// ➤ Get All Transactions (GET)
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transactions" });
  }
});

// ➤ Filter Transactions (GET)
router.get("/filter", async (req, res) => {
  try {
    const { category, startDate, endDate, amount } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (amount) {
      filter.amount = Number(amount); // Ensure exact match on amount
    }

    const filteredTransactions = await Transaction.find(filter);
    res.json(filteredTransactions);
  } catch (error) {
    res.status(500).json({ error: "Error filtering transactions" });
  }
});

// ➤ Update a Transaction (PUT)
router.put("/:id", async (req, res) => {
  try {
    const { type, amount, category, date } = req.body;
    if (!type || !amount || !category || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { type, amount, category, date },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Error updating transaction" });
  }
});

// ➤ Delete a Transaction (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );

    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting transaction" });
  }
});

// ➤ Summary Report (GET)
router.get("/summary", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;

    res.json({ totalIncome, totalExpense, balance });
  } catch (error) {
    res.status(500).json({ error: "Error calculating summary" });
  }
});

export default router;
