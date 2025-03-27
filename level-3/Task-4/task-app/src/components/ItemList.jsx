import React from "react";
import "../styles.css";

const items = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" },
];

const ItemList = () => {
  return (
    <div className="container">
      <h2>Fruit List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="list-item">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
