import express from 'express';
import axios from 'axios';

const router = express.Router();
const SPOONACULAR_API_KEY = '9ac3e306e9ad481fbb3877a81e696da0';
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// Search recipes from Spoonacular API
router.get('/search', async (req, res) => {
  try {
    const { query, cuisine, diet, intolerances, number = 12 } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const params = {
      apiKey: SPOONACULAR_API_KEY,
      query,
      number,
      addRecipeInformation: true,
      fillIngredients: true
    };
    
    if (cuisine) params.cuisine = cuisine;
    if (diet) params.diet = diet;
    if (intolerances) params.intolerances = intolerances;
    
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/complexSearch`, {
      params
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Spoonacular search error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Error searching recipes from external API',
      error: error.response?.data?.message || error.message
    });
  }
});

// Get recipe details from Spoonacular API
router.get('/recipe/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/${id}/information`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        includeNutrition: true
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Spoonacular recipe details error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Error fetching recipe details from external API',
      error: error.response?.data?.message || error.message
    });
  }
});

// Get random recipes from Spoonacular API
router.get('/random', async (req, res) => {
  try {
    const { number = 6, tags } = req.query;
    
    const params = {
      apiKey: SPOONACULAR_API_KEY,
      number
    };
    
    if (tags) params.tags = tags;
    
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/random`, {
      params
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Spoonacular random recipes error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Error fetching random recipes from external API',
      error: error.response?.data?.message || error.message
    });
  }
});

// Get recipe nutrition information
router.get('/recipe/:id/nutrition', async (req, res) => {
  try {
    const { id } = req.params;
    
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/${id}/nutritionWidget.json`, {
      params: {
        apiKey: SPOONACULAR_API_KEY
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Spoonacular nutrition error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Error fetching nutrition information from external API',
      error: error.response?.data?.message || error.message
    });
  }
});

// Search recipes by ingredients
router.get('/findByIngredients', async (req, res) => {
  try {
    const { ingredients, number = 12, ranking = 1 } = req.query;
    
    if (!ingredients) {
      return res.status(400).json({ message: 'Ingredients parameter is required' });
    }
    
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/findByIngredients`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        ingredients,
        number,
        ranking
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Spoonacular find by ingredients error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Error searching recipes by ingredients from external API',
      error: error.response?.data?.message || error.message
    });
  }
});

export default router;