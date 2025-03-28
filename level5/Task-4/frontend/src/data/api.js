const API_KEY = "9ac3e306e9ad481fbb3877a81e696da0";
const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`;

export const fetchRecipes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
