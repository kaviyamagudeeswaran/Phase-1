import React from "react";
import RecipeList from "./components/RecipeList";

const App = () => {
  const recipes = [
    { id: 1, name: "Pasta" },
    { id: 2, name: "Pizza" },
    { id: 3, name: "Salad" },
  ];

  return (
    <div>
      <h1>My Recipe App</h1>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default App;
