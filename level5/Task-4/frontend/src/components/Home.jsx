import { useEffect, useState } from "react";
import { fetchRecipes } from "../data/fetchRecipes";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getRecipes() {
      const data = await fetchRecipes();
      setRecipes(data);
    }
    getRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Recipe Finder</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />
      <div className="row">
        {filteredRecipes.map((recipe) => (
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
        ))}
      </div>
    </div>
  );
}
