import React, {useContext} from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';
import Modal from './Modal';
import './MovieGrid.css';

const MovieGrid = () => {
    // handle business logic here
    const {movies, loadMoreMovies, searchQuery, closeModal, selectedMovie} = useContext(MovieContext);

    const renderCards = () => {
    if (movies.length === 0) {
      return <p>No movies found.</p>;
    }
    return movies.map((movie, index) => <MovieCard key={index} props={movie} />);
  };



  return (
    <div className="movie-grid-parent">
       <h2>
        {searchQuery
          ? `Search Results for "${searchQuery}"`
          : 'Now Playing'}
      </h2>

      <div className="movie-grid">
        {renderCards()}
      </div>
     
       {!searchQuery && (
        <div className="load-more-wrapper">
          <button className="load-more-button" onClick={loadMoreMovies}>
            Load More Movies
          </button>
        </div>
      )}
      <Modal isOpen={selectedMovie} onClose={closeModal}>
        {selectedMovie && (
          <div className="movie-details">
            <h2>{selectedMovie.title}</h2>
            <p>Release Date: {selectedMovie.release_date}</p>
            <p>Rating: {selectedMovie.vote_average}</p>
            <p> Genres: {selectedMovie.genres}</p>
            <p>{selectedMovie.overview}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MovieGrid;

