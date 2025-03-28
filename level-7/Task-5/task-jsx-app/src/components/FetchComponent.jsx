import React from "react";
import useFetch from "../hooks/useFetch";
import "../styles/styles.css";

const FetchComponent = () => {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  return (
    <div className="container">
      <h2>Fetch Data Hook</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && (
        <div className="card">
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
};

export default FetchComponent;
