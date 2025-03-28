export async function fetchRecipes() {
  const API_URL =
    "https://api.spoonacular.com/recipes/random?number=10&apiKey=0a17ee4315634a4180b91df178978005";
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}
