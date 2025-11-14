import express from 'express';
import { body, validationResult } from 'express-validator';
import Recipe from '../models/Recipe.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all recipes for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const { search, cuisine, mealType, difficulty, sortBy = 'title' } = req.query;
    
    let query = { author: req.user._id };
    
    // Add search filters
    if (search) {
      query.$text = { $search: search };
    }
    
    if (cuisine) {
      query.cuisine = cuisine;
    }
    
    if (mealType) {
      query.mealType = mealType;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Sort options
    let sortOptions = {};
    switch (sortBy) {
      case 'cookTime':
        sortOptions = { cookTime: 1 };
        break;
      case 'servings':
        sortOptions = { servings: 1 };
        break;
      case 'createdAt':
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { title: 1 };
    }

    const recipes = await Recipe.find(query).sort(sortOptions);
    res.json(recipes);
  } catch (error) {
    console.error('Get recipes error:', error);
    res.status(500).json({ message: 'Server error while fetching recipes' });
  }
});

// Get single recipe
router.get('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ 
      _id: req.params.id, 
      $or: [{ author: req.user._id }, { isPublic: true }] 
    });
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.json(recipe);
  } catch (error) {
    console.error('Get recipe error:', error);
    res.status(500).json({ message: 'Server error while fetching recipe' });
  }
});

// Create new recipe
router.post('/', auth, [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('cookTime').isNumeric().withMessage('Cook time must be a number'),
  body('servings').isNumeric().withMessage('Servings must be a number'),
  body('ingredients').isArray({ min: 1 }).withMessage('At least one ingredient is required'),
  body('instructions').isArray({ min: 1 }).withMessage('At least one instruction is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const recipeData = {
      ...req.body,
      author: req.user._id
    };

    const recipe = new Recipe(recipeData);
    await recipe.save();
    
    res.status(201).json(recipe);
  } catch (error) {
    console.error('Create recipe error:', error);
    res.status(500).json({ message: 'Server error while creating recipe' });
  }
});

// Update recipe
router.put('/:id', auth, [
  body('title').optional().trim().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('description').optional().trim().isLength({ min: 1 }).withMessage('Description cannot be empty'),
  body('cookTime').optional().isNumeric().withMessage('Cook time must be a number'),
  body('servings').optional().isNumeric().withMessage('Servings must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }
    
    res.json(recipe);
  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(500).json({ message: 'Server error while updating recipe' });
  }
});

// Delete recipe
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ 
      _id: req.params.id, 
      author: req.user._id 
    });
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }
    
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({ message: 'Server error while deleting recipe' });
  }
});

// Rate recipe
router.post('/:id/rate', auth, [
  body('rating').isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { rating } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Calculate new average rating
    const newRatingCount = recipe.ratingCount + 1;
    const newRating = ((recipe.rating * recipe.ratingCount) + rating) / newRatingCount;
    
    recipe.rating = newRating;
    recipe.ratingCount = newRatingCount;
    await recipe.save();
    
    res.json({ rating: newRating, ratingCount: newRatingCount });
  } catch (error) {
    console.error('Rate recipe error:', error);
    res.status(500).json({ message: 'Server error while rating recipe' });
  }
});

export default router;