import React, { createContext, useEffect, useState } from 'react';
import data from '../data/data';

const MovieContext = createContext();

function initializeMovie(movie) {
  return {
    ...movie,
    isFavorite: false,
    isWatched: false,
  };
}

// Provider Component
function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);

  // Fetch movies from TMDB API
  const fetchMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log('ressulllt', result);
    const moviesWithFlags = result.results.map(initializeMovie);
    console.log(moviesWithFlags);
    setMovies((prevMovies) => [...prevMovies, ...moviesWithFlags]);

  } catch (error) {
    console.error('*************Error fetching movies****************', error);
  }
};

  // Fetch movies on page change
  useEffect(() => {
    fetchMovies();
  }, [page]);

  // Toggle favorite status
  function toggleFavorite(id) {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id
          ? { ...movie, isFavorite: !movie.isFavorite }
          : movie
      )
    );
  }

  // Toggle watched status
  function toggleWatched(id) {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id
          ? { ...movie, isWatched: !movie.isWatched }
          : movie
      )
    );
  }

  // Open and close modal
  function openModal(movie) {
    setSelectedMovie(movie);
  }

  function closeModal() {
    setSelectedMovie(null);
  }

  // Load next page of movies
  function loadMoreMovies() {
    setPage((prevPage) => prevPage + 1);
  }

 
  return (
    <MovieContext.Provider
      value={{
        movies,
        toggleFavorite,
        toggleWatched,
        openModal,
        closeModal,
        selectedMovie,
        loadMoreMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export { MovieContext, MovieProvider};
