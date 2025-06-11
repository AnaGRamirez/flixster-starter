import React, {useContext} from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';
import './MovieGrid.css'
import data from '../data/data';
import { use } from 'react';


const MovieGrid = ({ items }) => {

    const {movies, loadMoreMovies} = useContext(MovieContext);
    const renderCards = movies.map((movie, index )=> (
    <MovieCard key={index} props={movie} />
  ));

  return (
    <div className="movie-grid-parent">
    
      <div className="movie-grid">
        {renderCards}
      </div>

      <div className="load-more-wrapper">
        <button className = "load-more-button" onClick={loadMoreMovies}>
          Load More Movies
        </button>
      </div>
    </div>
  );
};


export default MovieGrid;
