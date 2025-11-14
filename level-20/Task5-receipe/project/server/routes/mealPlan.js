import express from 'express';
import MealPlan from '../models/MealPlan.js';
import Recipe from '../models/Recipe.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get meal plan for a specific week
router.get('/:week', auth, async (req, res) => {
  try {
    const { week } = req.params;
    
    let mealPlan = await MealPlan.findOne({ 
      user: req.user._id, 
      week 
    }).populate('meals.Monday.Breakfast meals.Monday.Lunch meals.Monday.Dinner meals.Monday.Snack meals.Tuesday.Breakfast meals.Tuesday.Lunch meals.Tuesday.Dinner meals.Tuesday.Snack meals.Wednesday.Breakfast meals.Wednesday.Lunch meals.Wednesday.Dinner meals.Wednesday.Snack meals.Thursday.Breakfast meals.Thursday.Lunch meals.Thursday.Dinner meals.Thursday.Snack meals.Friday.Breakfast meals.Friday.Lunch meals.Friday.Dinner meals.Friday.Snack meals.Saturday.Breakfast meals.Saturday.Lunch meals.Saturday.Dinner meals.Saturday.Snack meals.Sunday.Breakfast meals.Sunday.Lunch meals.Sunday.Dinner meals.Sunday.Snack');
    
    if (!mealPlan) {
      // Create empty meal plan structure
      const emptyMealPlan = {
        Monday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
        Tuesday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
        Wednesday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
        Thursday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
        Friday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
        Saturday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
        Sunday: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] }
      };
      return res.json(emptyMealPlan);
    }
    
    res.json(mealPlan.meals);
  } catch (error) {
    console.error('Get meal plan error:', error);
    res.status(500).json({ message: 'Server error while fetching meal plan' });
  }
});

// Update meal plan for a specific week
router.put('/:week', auth, async (req, res) => {
  try {
    const { week } = req.params;
    const { meals } = req.body;
    
    // Validate that all recipe IDs exist and belong to the user
    const allRecipeIds = [];
    Object.values(meals).forEach(day => {
      Object.values(day).forEach(mealArray => {
        mealArray.forEach(recipe => {
          if (recipe._id) {
            allRecipeIds.push(recipe._id);
          }
        });
      });
    });
    
    if (allRecipeIds.length > 0) {
      const validRecipes = await Recipe.find({
        _id: { $in: allRecipeIds },
        $or: [{ author: req.user._id }, { isPublic: true }]
      });
      
      if (validRecipes.length !== allRecipeIds.length) {
        return res.status(400).json({ message: 'Some recipes are invalid or unauthorized' });
      }
    }
    
    // Convert recipe objects to just IDs for storage
    const mealsWithIds = {};
    Object.keys(meals).forEach(day => {
      mealsWithIds[day] = {};
      Object.keys(meals[day]).forEach(mealType => {
        mealsWithIds[day][mealType] = meals[day][mealType].map(recipe => recipe._id);
      });
    });
    
    const mealPlan = await MealPlan.findOneAndUpdate(
      { user: req.user._id, week },
      { meals: mealsWithIds },
      { new: true, upsert: true, runValidators: true }
    ).populate('meals.Monday.Breakfast meals.Monday.Lunch meals.Monday.Dinner meals.Monday.Snack meals.Tuesday.Breakfast meals.Tuesday.Lunch meals.Tuesday.Dinner meals.Tuesday.Snack meals.Wednesday.Breakfast meals.Wednesday.Lunch meals.Wednesday.Dinner meals.Wednesday.Snack meals.Thursday.Breakfast meals.Thursday.Lunch meals.Thursday.Dinner meals.Thursday.Snack meals.Friday.Breakfast meals.Friday.Lunch meals.Friday.Dinner meals.Friday.Snack meals.Saturday.Breakfast meals.Saturday.Lunch meals.Saturday.Dinner meals.Saturday.Snack meals.Sunday.Breakfast meals.Sunday.Lunch meals.Sunday.Dinner meals.Sunday.Snack');
    
    res.json(mealPlan.meals);
  } catch (error) {
    console.error('Update meal plan error:', error);
    res.status(500).json({ message: 'Server error while updating meal plan' });
  }
});

// Delete meal plan for a specific week
router.delete('/:week', auth, async (req, res) => {
  try {
    const { week } = req.params;
    
    await MealPlan.findOneAndDelete({ 
      user: req.user._id, 
      week 
    });
    
    res.json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    console.error('Delete meal plan error:', error);
    res.status(500).json({ message: 'Server error while deleting meal plan' });
  }
});

export default router;