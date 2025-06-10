import React, {createContext, useState} from 'react';
import data from '../data/data';

const MovieContext = createContext();

function initializeMovie(movie) {

    return {
        ...movie,
        isFavorite: false,
        isWatched: false

    }
}


// Provider Component
function MovieProvider(props) {
    
    var initialMovies = data.results;
    var moviesWithFlags = initialMovies.map(initializeMovie);

    const [movies, setMovies] = useState(moviesWithFlags);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const[page, setPage] = useState(1);


    
    function toggleFavorite(id){

        setMovies(movies.map((movie)=> {
          return movie.id == id ? 
        {...movie, isFavorite: !movie.isFavorite, isWatched: isWatched}
        : movie
        }
    ));

}


    function toggleWatched(id){

      setMovies(movies.map((movie)=> {
          return movie.id == id ? 
        {...movie, isFavorite: movie.isFavorite, isWatched: !isWatched}
        : movie
        }
    ));

        }

    function openModal(){
        setSelectedMovie(movie);
    }

    function closeModal(){
        setSelectedMovie(null);
    }



    function loadMoreMovies(){
        var nextPage = page + 1;
        var newmoviesWithFlags = data.results.map(initializeMovie);
        var updatedMovieList = [...movies, ...newmoviesWithFlags];
        setMovies(updatedMovieList);
        setPage(nextPage);

    }


    return (

    <MovieContext.Provider 
    value = {{
        movies: movies,
        toggleFavorite: toggleFavorite,
        toggleWatched: toggleWatched,
        openModal: openModal,
        closeModal: closeModal,
        selectedMovie: selectedMovie,
        loadMoreMovies: loadMoreMovies
    }}>
       {props.children}
    </MovieContext.Provider>
    )};


export {MovieContext, MovieProvider};