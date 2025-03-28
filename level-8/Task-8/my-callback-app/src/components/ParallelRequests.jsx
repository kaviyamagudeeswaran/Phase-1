import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/styles.css";

const ParallelRequests = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [usersResponse, postsResponse] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/users"),
          axios.get("https://jsonplaceholder.typicode.com/posts"),
        ]);

        setData([
          { title: "Users", items: usersResponse.data },
          { title: "Posts", items: postsResponse.data },
        ]);
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
      {loading && <div className="loader"></div>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="data-container">
          {data.map((section, index) => (
            <div key={index} className="card fade-in">
              <h2>{section.title}</h2>
              <ul>
                {section.items.slice(0, 5).map((item, i) => (
                  <li key={i}>{item.name || item.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParallelRequests;
