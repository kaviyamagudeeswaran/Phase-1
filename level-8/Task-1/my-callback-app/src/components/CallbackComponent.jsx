import React, { useState } from "react";
import fetchData from "../utils/fetchData";
import "../styles/styles.css"; // Import CSS

const CallbackComponent = () => {
  const [data, setData] = useState([]);

  const handleFetchData = () => {
    fetchData((receivedData) => {
      setData(receivedData);
    });
  };

  return (
    <div className="container">
      <h2>Basic Callback Example</h2>
      <button onClick={handleFetchData} className="fetch-button">
        Fetch Data
      </button>
      {data.length > 0 && (
        <ul className="data-list">
          {data.map((item) => (
            <li key={item.id}>
              {item.name} - {item.age} years old
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CallbackComponent;
