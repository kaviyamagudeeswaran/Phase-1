import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchRecipes } from "../data/fetchRecipes";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState(location.state?.recipe || null); // ✅ Use state from Home

  useEffect(() => {
    async function getRecipe() {
      if (!recipe) {
        // ✅ Fetch only if no state
        const data = await fetchRecipes();
        const selectedRecipe = data.find((r) => r.id.toString() === id);
        setRecipe(selectedRecipe);
      }
    }
    getRecipe();
  }, [id, recipe]);

  if (!recipe) return <h2 className="text-center">Recipe Not Found</h2>;

  return (
    <div className="container mt-4">
      <h1 className="text-primary">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="img-fluid d-block mx-auto my-3"
      />

      <h3 className="mt-4">Ingredients</h3>
      {recipe.extendedIngredients ? (
        <ul className="list-group">
          {recipe.extendedIngredients.map((ing, index) => (
            <li key={index} className="list-group-item">
              {ing.original}
            </li>
          ))}
        </ul>
      ) : (
        <p>No ingredients available.</p>
      )}

      <h3 className="mt-4">Instructions</h3>
      <p className="lead">
        {recipe.instructions || "No instructions available."}
      </p>

      <Link to="/" className="btn btn-secondary mt-3">
        Back to Home
      </Link>
    </div>
  );
}
