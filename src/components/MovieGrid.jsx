import React, {useContext} from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';
import './MovieGrid.css'
import data from '../data/data';
import { use } from 'react';


    

const MovieGrid = ({ items }) => {

    const {movies} = useContext(MovieContext);
    const renderedItems = movies.map(movie => (
    <MovieCard key={movie.id} props={movie} />
  ));


  return (
    <div className="movie-grid">
      {renderedItems}
    </div>
  );
};


export default MovieGrid;
