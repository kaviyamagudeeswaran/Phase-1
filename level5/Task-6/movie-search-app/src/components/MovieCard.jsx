import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`} className="text-decoration-none">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.Title}
        />
        <p className="movie-title">{movie.Title}</p>
      </Link>
    </div>
  );
}

export default MovieCard;
