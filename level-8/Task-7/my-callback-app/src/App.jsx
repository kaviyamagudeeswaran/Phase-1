import React, { useEffect, useState } from "react";
import { api } from "./api/axiosInstance";
import Loader from "./components/Loader";
//import "../styles.css"; // Import CSS
import "/src/styles.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => setError("Failed to fetch data"));
  }, []);

  return (
    <div className="app-container">
      <Loader />
      <h1>Axios Interceptors Example</h1>
      {error && <p className="error-message">{error}</p>}
      {posts.length > 0 ? (
        <ul>
          {posts.slice(0, 5).map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default App;
