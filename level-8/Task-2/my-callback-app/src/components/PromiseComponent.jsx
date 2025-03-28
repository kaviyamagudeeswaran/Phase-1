import React, { useState } from "react";
import { fetchDataPromise } from "../utils/fetchDataPromise";
import "../styles/styles.css";

const PromiseComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchData = () => {
    setLoading(true);
    setError("");
    setData([]);

    fetchDataPromise()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h2>Promise-based Data Fetching</h2>
      <button className="fetch-button" onClick={handleFetchData}>
        Fetch Data
      </button>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="data-list">
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PromiseComponent;
