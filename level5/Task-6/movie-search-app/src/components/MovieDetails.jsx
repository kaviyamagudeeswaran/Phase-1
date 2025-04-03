import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "be432db4"; // Replace with your OMDb API key
const API_URL = "https://www.omdbapi.com/";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}?i=${id}&apikey=${API_KEY}`)
      .then((response) => {
        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError(response.data.Error);
        }
      })
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-info">Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center">{movie.Title}</h2>
      <div className="text-center">
        <img src={movie.Poster} alt={movie.Title} className="img-fluid my-3" />
      </div>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Year:</strong> {movie.Year}
        </li>
        <li className="list-group-item">
          <strong>Plot:</strong> {movie.Plot}
        </li>
        <li className="list-group-item">
          <strong>Actors:</strong> {movie.Actors}
        </li>
        <li className="list-group-item">
          <strong>IMDB Rating:</strong> {movie.imdbRating}
        </li>
      </ul>
    </div>
  );
}

export default MovieDetails;
