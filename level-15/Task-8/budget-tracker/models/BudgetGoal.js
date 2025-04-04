import mongoose from "mongoose";

const budgetGoalSchema = new mongoose.Schema({
  category: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
});

const BudgetGoal = mongoose.model("BudgetGoal", budgetGoalSchema);
export default BudgetGoal;
