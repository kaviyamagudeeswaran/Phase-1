import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "be432db4"; // Replace with your OMDb API key
const API_URL = "https://www.omdbapi.com/";

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm.length < 3) return;
    setLoading(true);
    setError(null);

    axios
      .get(`${API_URL}?s=${searchTerm}&apikey=${API_KEY}`)
      .then((response) => {
        if (response.data.Response === "True") {
          setMovies(response.data.Search);
        } else {
          setError(response.data.Error);
        }
      })
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  return (
    <div className="container text-center py-4">
      <h1 className="mb-4">Movie Database Search</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        className="form-control search-container"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <p className="text-info mt-3">Loading...</p>}
      {error && <p className="text-danger mt-3">{error}</p>}

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <p className="text-muted mt-4">No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default MovieSearch;
