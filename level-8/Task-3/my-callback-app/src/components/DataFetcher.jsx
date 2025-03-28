import React, { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import "./DataFetcher.css";

const DataFetcher = () => {
  const [fetchUrl, setFetchUrl] = useState(null);
  const { data, loading, error } = useFetchData(fetchUrl);

  return (
    <div className="container">
      <h2>Async/Await Data Fetching</h2>
      <button
        onClick={() =>
          setFetchUrl("https://jsonplaceholder.typicode.com/users")
        }
      >
        Fetch Data
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && (
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DataFetcher;
