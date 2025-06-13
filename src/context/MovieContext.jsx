import React, {createContext, useEffect, useState} from "react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [movieDetail, setMovieDetail] = useState([]);
  const [movieVideos, setMovieVideos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);

  // Fetch movies from TMDB API conditionally (for all movies and search results)
  const fetchMovies = async () => {
    if (!searchQuery) {
      var url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
      console.log("we are displaying now playing!!!");
      var options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
        },
      };
    } else if (searchQuery) {
      var url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`;
      console.log("we are supposed to be displaying search results");
      var options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
        },
      };
      setMovies([]);
    }

    try {
      console.log("value of selected movie", selectedMovie);
      console.log("whyyy??", url);
      const response = await fetch(url, options);
      const result = await response.json();
      console.log("you are supposed to fetch resuls", result);
      const moviesWithFlags = result.results.map(initializeMovie);
      setMovies((prevMovies) => [...prevMovies, ...moviesWithFlags]);
    } catch (error) {
      console.error(
        "*************Error fetching movies****************",
        error
      );
    }
  };

  const fetchMovieDetails = async () => {
    if (!selectedMovie || !selectedMovie.id) return;

    try {
      const url = `https://api.themoviedb.org/3/movie/${selectedMovie.id}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
        },
      };

      const response = await fetch(url, options);
      const result = await response.json();
      setMovieDetail(result);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  // New: Fetch movie videos (trailers)
  const fetchMovieVideos = async () => {
    if (!selectedMovie || !selectedMovie.id) return;

    try {
      const url = `https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
        },
      };

      const response = await fetch(url, options);
      const result = await response.json();

      // Filter for official trailers from YouTube
      const trailers = result.results.filter(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer" &&
          video.official === true
      );

      setMovieVideos(trailers);
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };

  // Fetch movies on page change
  useEffect(() => {
    if (selectedMovie && selectedMovie.id) {
      fetchMovieDetails();
      fetchMovieVideos();
    }
  }, [selectedMovie]);

  useEffect(() => {
    fetchMovies();
  }, [page, searchQuery]);

  // Toggle favorite status
  function toggleFavorite(id) {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.id === id) {
          const newFavoriteStatus = !movie.isFavorite;

          setFavorites((prevFavorites) => {
            if (newFavoriteStatus) {
              // Add to favorites if not already there
              if (!prevFavorites.some((favMovie) => favMovie.id === id)) {
                return [...prevFavorites, {...movie, isFavorite: true}];
              }
              return prevFavorites;
            } else {
              // Remove from favorites
              return prevFavorites.filter((favMovie) => favMovie.id !== id);
            }
          });

          return {...movie, isFavorite: newFavoriteStatus};
        }
        return movie;
      })
    );
  }

  // Toggle watched status
  function toggleWatched(id) {
    console.log("what's going on?");
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? {...movie, isWatched: !movie.isWatched} : movie
      )
    );

    setWatched((prevWatched) => {
      const isAlreadyWatched = prevWatched.some((movie) => movie.id === id);

      if (isAlreadyWatched) {
        // Remove from watched if already watched
        return prevWatched.filter((movie) => movie.id !== id);
      } else {
        // Find the movie and add to watched if not already there
        const movieToAdd = movies.find((movie) => movie.id === id);
        return movieToAdd ? [...prevWatched, movieToAdd] : prevWatched;
      }
    });
  }
  // Open and close modal
  function openModal(movie) {
    setSelectedMovie(movie);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setSelectedMovie(null);
    document.body.style.overflow = "unset";
    setMovieDetail([]);
  }

  // Load next page of movies
  function loadMoreMovies() {
    setPage((prevPage) => prevPage + 1);
  }

  function sortMovies(option) {
    const sorted = [...movies];

    if (option === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "date") {
      sorted.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    } else if (option === "average") {
      sorted.sort((a, b) => b.vote_average - a.vote_average);
    }
    setMovies(sorted);
    setSortOption(option);
  }

  return (
    <MovieContext.Provider
      value={{
        movies: movies,
        toggleFavorite,
        toggleWatched,
        openModal,
        closeModal,
        selectedMovie,
        loadMoreMovies,
        sortMovies,
        setSearchQuery,
        searchQuery,
        movieDetail,
        setMovieDetail,
        movieVideos,
        favorites,
        watched,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
export {MovieContext, MovieProvider};
