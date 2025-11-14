import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const RecipeContext = createContext();

const recipeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECIPES':
      return {
        ...state,
        recipes: action.payload,
        loading: false,
      };
    case 'ADD_RECIPE':
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case 'UPDATE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.map(recipe =>
          recipe._id === action.payload._id ? action.payload : recipe
        ),
      };
    case 'DELETE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe._id !== action.payload),
      };
    case 'SET_MEAL_PLAN':
      return {
        ...state,
        mealPlan: action.payload,
      };
    case 'SET_SHOPPING_LIST':
      return {
        ...state,
        shoppingList: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, {
    recipes: [],
    mealPlan: {},
    shoppingList: [],
    loading: false,
    error: null,
  });

  const fetchRecipes = async (searchParams = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('/api/recipes', { params: searchParams });
      dispatch({ type: 'SET_RECIPES', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to fetch recipes' });
    }
  };

  const addRecipe = async (recipeData) => {
    try {
      const response = await axios.post('/api/recipes', recipeData);
      dispatch({ type: 'ADD_RECIPE', payload: response.data });
      return { success: true, recipe: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to add recipe' };
    }
  };

  const updateRecipe = async (id, recipeData) => {
    try {
      const response = await axios.put(`/api/recipes/${id}`, recipeData);
      dispatch({ type: 'UPDATE_RECIPE', payload: response.data });
      return { success: true, recipe: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update recipe' };
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`/api/recipes/${id}`);
      dispatch({ type: 'DELETE_RECIPE', payload: id });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete recipe' };
    }
  };

  const scaleRecipe = (recipe, servings) => {
    const scaleFactor = servings / recipe.servings;
    return {
      ...recipe,
      servings,
      ingredients: recipe.ingredients.map(ingredient => ({
        ...ingredient,
        amount: (ingredient.amount * scaleFactor).toFixed(2),
      })),
    };
  };

  const searchSpoonacularRecipes = async (query) => {
    try {
      const response = await axios.get('/api/spoonacular/search', {
        params: { query },
      });
      return response.data;
    } catch (error) {
      return { success: false, error: 'Failed to search external recipes' };
    }
  };

  const fetchMealPlan = async (week) => {
    try {
      const response = await axios.get(`/api/meal-plan/${week}`);
      dispatch({ type: 'SET_MEAL_PLAN', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch meal plan' });
    }
  };

  const updateMealPlan = async (week, mealPlan) => {
    try {
      const response = await axios.put(`/api/meal-plan/${week}`, mealPlan);
      dispatch({ type: 'SET_MEAL_PLAN', payload: response.data });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update meal plan' };
    }
  };

  const generateShoppingList = async (week) => {
    try {
      const response = await axios.post(`/api/shopping-list/generate/${week}`);
      dispatch({ type: 'SET_SHOPPING_LIST', payload: response.data });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to generate shopping list' };
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        ...state,
        fetchRecipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        scaleRecipe,
        searchSpoonacularRecipes,
        fetchMealPlan,
        updateMealPlan,
        generateShoppingList,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};