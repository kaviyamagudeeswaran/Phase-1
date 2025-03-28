import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/styles.css"; // Import CSS styles

const CancelableRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Create an abort controller
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            signal: controller.signal, // Pass the signal for cancellation
          }
        );
        setData(response.data.slice(0, 5)); // Get first 5 posts
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
        } else {
          setError("Failed to fetch data!");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Cancel request when component unmounts
    };
  }, []);

  return (
    <div className="container">
      <h1>Axios Request Cancellation</h1>
      {loading && <div className="loader"></div>}
      {error && <p className="error">{error}</p>}
      <div className="data-container">
        {data &&
          data.map((post) => (
            <div className="card" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CancelableRequest;
