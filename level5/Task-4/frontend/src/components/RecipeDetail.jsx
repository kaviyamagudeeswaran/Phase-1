import { useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RecipeDetail() {
  const location = useLocation();
  const recipe = location.state?.recipe;

  if (!recipe) return <h2 className="text-center">Recipe Not Found</h2>;

  return (
    <div className="container mt-4">
      <h1 className="text-primary text-center">{recipe.title}</h1>
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
