import React, {useContext} from "react";
import {MovieContext} from "../context/MovieContext";
import MovieCard from "./MovieCard";
import Modal from "./Modal";
import MovieDetails from "./MovieDetails";
import {useLocation} from "react-router-dom";
import "./MovieGrid.css";

const MovieGrid = () => {
  const {
    movies,
    loadMoreMovies,
    searchQuery,
    closeModal,
    selectedMovie,
    movieDetail,
    favorites,
    watched,
  } = useContext(MovieContext);
  const location = useLocation();
  const currentPath = location.pathname;

  const renderCards = () => {
    if (movies.length === 0) {
      return <p>No movies found.</p>;
    }
    else if (currentPath === "/favorites") {
      return favorites.map((movie, index) => (
        <MovieCard key={index} props={movie} />
      ));
    }
    else if (currentPath === "/watch") {
      return watched.map((movie, index) => (
        <MovieCard key={index} props={movie} />
      ));
    }
    else {
 return movies.map((movie, index) => (
      <MovieCard key={index} props={movie} />
    ));
    }

   
  };

  return (
    <div className="movie-grid-parent">
      <h2>
        {searchQuery
          ? `Search Results for "${searchQuery}"`
          : currentPath === "/watch"
          ? "Watched"
          : currentPath === "/favorites"
          ? "Favorites"
          : "Now Playing"}
      </h2>
      <div className="movie-grid">{renderCards()}</div>

      {!searchQuery && (
        <div className="load-more-wrapper">
          <button className="load-more-button" onClick={loadMoreMovies}>
            Load More Movies
          </button>
        </div>
      )}

      <Modal isOpen={!!selectedMovie} onClose={closeModal}>
        {movieDetail && <MovieDetails movie={movieDetail} />}
      </Modal>
    </div>
  );
};

export default MovieGrid;
