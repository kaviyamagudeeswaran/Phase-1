import React, { useState, useCallback } from "react";
import PrimeCalculator from "../components/PrimeCalculator";
import ChildButton from "../components/ChildButton";

const Dashboard = () => {
  const [limit, setLimit] = useState(1000);
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div className="container">
      <h2>Optimizing with useMemo and useCallback</h2>
      <p>Counter: {count}</p>
      <ChildButton increment={increment} />
      <PrimeCalculator limit={limit} />
      <button onClick={() => setLimit(limit + 500)}>Increase Limit</button>
    </div>
  );
};

export default Dashboard;
