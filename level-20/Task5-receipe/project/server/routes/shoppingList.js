import express from 'express';
import ShoppingList from '../models/ShoppingList.js';
import MealPlan from '../models/MealPlan.js';
import Recipe from '../models/Recipe.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get shopping list for a specific week
router.get('/:week', auth, async (req, res) => {
  try {
    const { week } = req.params;
    
    const shoppingList = await ShoppingList.findOne({ 
      user: req.user._id, 
      week 
    });
    
    if (!shoppingList) {
      return res.json([]);
    }
    
    res.json(shoppingList.items);
  } catch (error) {
    console.error('Get shopping list error:', error);
    res.status(500).json({ message: 'Server error while fetching shopping list' });
  }
});

// Generate shopping list from meal plan
router.post('/generate/:week', auth, async (req, res) => {
  try {
    const { week } = req.params;
    
    // Get meal plan for the week
    const mealPlan = await MealPlan.findOne({ 
      user: req.user._id, 
      week 
    }).populate('meals.Monday.Breakfast meals.Monday.Lunch meals.Monday.Dinner meals.Monday.Snack meals.Tuesday.Breakfast meals.Tuesday.Lunch meals.Tuesday.Dinner meals.Tuesday.Snack meals.Wednesday.Breakfast meals.Wednesday.Lunch meals.Wednesday.Dinner meals.Wednesday.Snack meals.Thursday.Breakfast meals.Thursday.Lunch meals.Thursday.Dinner meals.Thursday.Snack meals.Friday.Breakfast meals.Friday.Lunch meals.Friday.Dinner meals.Friday.Snack meals.Saturday.Breakfast meals.Saturday.Lunch meals.Saturday.Dinner meals.Saturday.Snack meals.Sunday.Breakfast meals.Sunday.Lunch meals.Sunday.Dinner meals.Sunday.Snack');
    
    if (!mealPlan) {
      return res.status(404).json({ message: 'No meal plan found for this week' });
    }
    
    // Collect all ingredients from all recipes in the meal plan
    const ingredientMap = new Map();
    
    Object.values(mealPlan.meals).forEach(day => {
      Object.values(day).forEach(mealArray => {
        mealArray.forEach(recipe => {
          if (recipe && recipe.ingredients) {
            recipe.ingredients.forEach(ingredient => {
              const key = `${ingredient.name.toLowerCase()}-${ingredient.unit}`;
              
              if (ingredientMap.has(key)) {
                const existing = ingredientMap.get(key);
                existing.amount += ingredient.amount;
              } else {
                ingredientMap.set(key, {
                  name: ingredient.name,
                  amount: ingredient.amount,
                  unit: ingredient.unit,
                  recipe: recipe._id
                });
              }
            });
          }
        });
      });
    });
    
    // Convert map to array and categorize items
    const items = Array.from(ingredientMap.values()).map(item => ({
      ...item,
      category: categorizeIngredient(item.name),
      isCompleted: false
    }));
    
    // Save or update shopping list
    const shoppingList = await ShoppingList.findOneAndUpdate(
      { user: req.user._id, week },
      { 
        items,
        generatedAt: new Date()
      },
      { new: true, upsert: true, runValidators: true }
    );
    
    res.json(shoppingList.items);
  } catch (error) {
    console.error('Generate shopping list error:', error);
    res.status(500).json({ message: 'Server error while generating shopping list' });
  }
});

// Update shopping list item completion status
router.put('/:week/item/:itemId', auth, async (req, res) => {
  try {
    const { week, itemId } = req.params;
    const { isCompleted } = req.body;
    
    const shoppingList = await ShoppingList.findOneAndUpdate(
      { 
        user: req.user._id, 
        week,
        'items._id': itemId
      },
      { 
        $set: { 'items.$.isCompleted': isCompleted }
      },
      { new: true }
    );
    
    if (!shoppingList) {
      return res.status(404).json({ message: 'Shopping list or item not found' });
    }
    
    res.json(shoppingList.items);
  } catch (error) {
    console.error('Update shopping list item error:', error);
    res.status(500).json({ message: 'Server error while updating shopping list item' });
  }
});

// Add custom item to shopping list
router.post('/:week/item', auth, async (req, res) => {
  try {
    const { week } = req.params;
    const { name, amount = 1, unit = 'item' } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Item name is required' });
    }
    
    const newItem = {
      name: name.trim(),
      amount,
      unit,
      category: categorizeIngredient(name),
      isCompleted: false
    };
    
    const shoppingList = await ShoppingList.findOneAndUpdate(
      { user: req.user._id, week },
      { 
        $push: { items: newItem }
      },
      { new: true, upsert: true, runValidators: true }
    );
    
    res.json(shoppingList.items);
  } catch (error) {
    console.error('Add shopping list item error:', error);
    res.status(500).json({ message: 'Server error while adding shopping list item' });
  }
});

// Remove item from shopping list
router.delete('/:week/item/:itemId', auth, async (req, res) => {
  try {
    const { week, itemId } = req.params;
    
    const shoppingList = await ShoppingList.findOneAndUpdate(
      { user: req.user._id, week },
      { 
        $pull: { items: { _id: itemId } }
      },
      { new: true }
    );
    
    if (!shoppingList) {
      return res.status(404).json({ message: 'Shopping list not found' });
    }
    
    res.json(shoppingList.items);
  } catch (error) {
    console.error('Remove shopping list item error:', error);
    res.status(500).json({ message: 'Server error while removing shopping list item' });
  }
});

// Helper function to categorize ingredients
function categorizeIngredient(name) {
  const categories = {
    'Produce': ['tomato', 'onion', 'garlic', 'pepper', 'lettuce', 'carrot', 'celery', 'potato', 'lemon', 'lime', 'apple', 'banana', 'spinach', 'broccoli', 'cucumber', 'avocado'],
    'Meat & Poultry': ['chicken', 'beef', 'pork', 'turkey', 'fish', 'salmon', 'tuna', 'shrimp', 'lamb', 'bacon'],
    'Dairy': ['milk', 'cheese', 'butter', 'yogurt', 'cream', 'eggs', 'sour cream'],
    'Pantry': ['flour', 'sugar', 'salt', 'pepper', 'oil', 'vinegar', 'rice', 'pasta', 'bread', 'oats'],
    'Spices & Herbs': ['basil', 'oregano', 'thyme', 'paprika', 'cumin', 'cinnamon', 'parsley', 'cilantro'],
    'Canned & Jarred': ['tomato sauce', 'beans', 'corn', 'olives', 'pickles', 'jam'],
    'Frozen': ['frozen vegetables', 'frozen fruit', 'ice cream'],
    'Beverages': ['water', 'juice', 'soda', 'coffee', 'tea']
  };
  
  const lowerName = name.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return category;
    }
  }
  
  return 'Other';
}

export default router;