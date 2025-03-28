import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DataFetcher.css"; // Import CSS

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setData(response.data.slice(0, 10)); // Display only 10 items
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Data Fetcher</h2>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <ul className="data-list">
          {data.map((item) => (
            <li key={item.id} className="data-item">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DataFetcher;
