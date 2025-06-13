import React from "react";
import Trailer from "./Trailer";

const MovieDetails = ({movie}) => {
  if (!movie) return null;

  return (
    <div className="movie-details">
      <div className="movie-header">
        <img
          className="movie-backdrop"
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
        />
        <h2 className="movie-title">{movie.title}</h2>
      </div>

      <div className="movie-info-grid">
        <div className="movie-meta">
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
          {movie.genres?.length > 0 && (
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          )}
        </div>

        <div className="movie-overview">
          <p>{movie.overview}</p>
        </div>
      </div>

      <Trailer />
    </div>
  );
};

export default MovieDetails;
