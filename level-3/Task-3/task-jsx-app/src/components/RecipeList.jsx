import React from "react";

const RecipeList = ({ recipes }) => {
  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li> // Unique key using id
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
