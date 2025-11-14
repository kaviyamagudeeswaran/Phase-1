import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  }
});

const nutritionSchema = new mongoose.Schema({
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  fiber: Number,
  sugar: Number
});

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ingredients: [ingredientSchema],
  instructions: [{
    type: String,
    required: true
  }],
  cookTime: {
    type: Number,
    required: true
  },
  prepTime: {
    type: Number,
    default: 0
  },
  servings: {
    type: Number,
    required: true,
    min: 1
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  cuisine: {
    type: String,
    default: ''
  },
  mealType: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Appetizer'],
    default: 'Dinner'
  },
  tags: [String],
  nutrition: nutritionSchema,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
recipeSchema.index({ title: 'text', description: 'text', tags: 'text' });
recipeSchema.index({ author: 1, createdAt: -1 });
recipeSchema.index({ cuisine: 1, mealType: 1 });

export default mongoose.model('Recipe', recipeSchema);