import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RecipeList({ recipes }) {
  return (
    <div className="row">
      {recipes.length === 0 ? (
        <p className="text-center">No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-6 mb-4">
            <div className="card">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                {/* ✅ Pass Recipe Data as State */}
                <Link
                  to={`/recipe/${recipe.id}`}
                  state={{ recipe }}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
