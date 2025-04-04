import express from "express";
import BudgetGoal from "../models/BudgetGoal.js";

const router = express.Router();

// ➤ Add a Budget Goal (POST)
router.post("/", async (req, res) => {
  try {
    const { category, goalAmount } = req.body;
    const newGoal = new BudgetGoal({ category, goalAmount });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: "Error adding budget goal" });
  }
});

// ➤ Get All Budget Goals (GET)
router.get("/", async (req, res) => {
  try {
    const goals = await BudgetGoal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: "Error fetching budget goals" });
  }
});

export default router;
