import { useEffect, useState } from "react";
import { fetchRecipes } from "../data/fetchRecipes";
import RecipeList from "../components/RecipeList";
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
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
}
