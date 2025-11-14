import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  week: {
    type: String,
    required: true // Format: "2024-W12"
  },
  meals: {
    Monday: {
      Breakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Lunch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Dinner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Snack: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
    },
    Tuesday: {
      Breakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Lunch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Dinner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Snack: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
    },
    Wednesday: {
      Breakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Lunch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Dinner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Snack: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
    },
    Thursday: {
      Breakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Lunch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Dinner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Snack: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
    },
    Friday: {
      Breakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Lunch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Dinner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Snack: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
    },
    Saturday: {
      Breakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Lunch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Dinner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Snack: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
    },
    Sunday: {
      Breakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Lunch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Dinner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
      Snack: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
    }
  }
}, {
  timestamps: true
});

// Compound index for user and week
mealPlanSchema.index({ user: 1, week: 1 }, { unique: true });

export default mongoose.model('MealPlan', mealPlanSchema);