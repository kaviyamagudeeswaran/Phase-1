import mongoose from 'mongoose';

const shoppingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 1
  },
  unit: {
    type: String,
    default: 'item'
  },
  category: {
    type: String,
    default: 'Other'
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }
});

const shoppingListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  week: {
    type: String,
    required: true // Format: "2024-W12"
  },
  items: [shoppingItemSchema],
  generatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for user and week
shoppingListSchema.index({ user: 1, week: 1 }, { unique: true });

export default mongoose.model('ShoppingList', shoppingListSchema);