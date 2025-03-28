import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import "../styles/styles.css";

const DataFetcher = () => {
  const [forceRefresh, setForceRefresh] = useState(false);
  const { data, loading, error, refetch } = useAxios(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
    {},
    forceRefresh
  );

  return (
    <div className="container">
      <h2>📦 Axios Hook with Caching</h2>
      <button
        className="refresh-btn"
        onClick={() => setForceRefresh(!forceRefresh)}
      >
        🔄 Force Refresh
      </button>

      {loading && <p className="loading">⏳ Loading...</p>}
      {error && <p className="error">❌ {error}</p>}

      <ul className="data-list">
        {data?.map((post) => (
          <li key={post.id} className="data-item">
            <strong>📝 {post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
