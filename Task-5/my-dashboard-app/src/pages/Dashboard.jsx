import React, { useState, useEffect } from "react";
import LargeList from "../components/LargeList";

const Dashboard = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const flowers = [
    "Rose",
    "Tulip",
    "Sunflower",
    "Daisy",
    "Lily",
    "Orchid",
    "Peony",
    "Lavender",
    "Marigold",
    "Chrysanthemum",
    "Daffodil",
    "Jasmine",
    "Carnation",
    "Violet",
    "Poppy",
    "Hibiscus",
    "Lotus",
    "Bluebell",
    "Magnolia",
    "Geranium",
  ];

  // Repeat flowers to create a large list
  const largeFlowerList = Array.from(
    { length: 1000 },
    (_, index) => flowers[index % flowers.length]
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Memoization with React.memo</h2>
      <h3>Counter: {count}</h3>
      <LargeList items={largeFlowerList} />
    </div>
  );
};

export default Dashboard;
