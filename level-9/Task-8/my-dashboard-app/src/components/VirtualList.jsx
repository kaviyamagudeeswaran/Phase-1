import React from "react";
import { FixedSizeList as List } from "react-window";
import "../styles.css"; // Import CSS styles

const foodItems = [
  "Pizza",
  "Burger",
  "Pasta",
  "Sushi",
  "Tacos",
  "Biryani",
  "Ice Cream",
  "Fries",
  "Sandwich",
  "Noodles",
  "Steak",
  "Salad",
  "Soup",
  "Cake",
  "Doughnuts",
  "Chocolate",
  "Shrimp",
  "Ramen",
  "Pancakes",
  "Waffles",
];

const itemCount = 10000; // Large list
const itemHeight = 60; // Adjusted height for styling

const Row = ({ index, style }) => {
  const item = foodItems[index % foodItems.length]; // Loop food items
  return (
    <div className="list-item" style={style}>
      🍽️ {item}
    </div>
  );
};

const VirtualList = () => {
  return (
    <div className="list-container">
      <h2>🍔 Food Menu (Virtual Scrolling) 🍕</h2>
      <List
        height={500} // Viewport height
        itemCount={itemCount}
        itemSize={itemHeight}
        width={"100%"}
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualList;
