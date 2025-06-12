import React, { createContext, useEffect, useState } from 'react';

const MovieContext = createContext();

function initializeMovie(movie) {
  return {
    ...movie,
    isFavorite: false,
    isWatched: false,
  };
}

// Provider Component
function MovieProvider({children}) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');


  // Fetch movies from TMDB API conditionally (for all movies and search results)
  const fetchMovies = async () => {

  if (!searchQuery) {
      var url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
      console.log("we are displaying now playing!!!")
      var options = {
        method: 'GET',
        headers: { 
          Accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
        },
      };
      
  }
  else if (searchQuery) {
      var url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`;
      console.log("we are supposed to be displaying search results");
      var options = {
        method: 'GET',
        headers: { 
          Accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
        },
      }; 
      setMovies([]);
  }

  try {
    console.log("whyyy??", url);
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("you are supposed to fetch resuls", result)
    const moviesWithFlags = result.results.map(initializeMovie);
    setMovies((prevMovies) => [...prevMovies, ...moviesWithFlags]);

  } catch (error) {
    console.error('*************Error fetching movies****************', error);
  }
};

  // Fetch movies on page change
  useEffect(() => {
    fetchMovies();
  }, [page, searchQuery]);

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
      console.log("what's going on?");
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
// filter  : WRONG BECUASE THERE IS AN ENDPOINT FOR THIS, plus this only renders the movies in the movies array (not all movies that match)
  // const filteredMovies = movies
  // .filter((movie) =>
  //   movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  // ) 

  function sortMovies(option) {
    const sorted = [...movies];
    
    if (option === 'title'){
        sorted.sort((a,b) => a.title.localeCompare(b.title));
    }

    else if (option === 'date'){  
        sorted.sort((a,b) => new Date(b.release_date)- new Date(a.release_date));
    }
    else if (option === 'average'){
        sorted.sort((a,b)=> b.vote_average - a.vote_average);
    }
      setMovies(sorted);
      setSortOption(option);
  }

  return (
    <MovieContext.Provider
      value={{
        movies:movies,
        toggleFavorite,
        toggleWatched,
        openModal,
        closeModal,
        selectedMovie,
        loadMoreMovies,
        sortMovies,
        setSearchQuery,
        searchQuery,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
export { MovieContext, MovieProvider};
