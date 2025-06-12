import React from 'react'
import './SearchForm.css'

// this child has takes a props called onMovieChange
// this function must accept a new movie name and set it after it gets it from the form.
function SearchForm({ onMovieChange }) {

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target) 
    const movieName = formData.get('movie')
    onMovieChange(movieName)  
    event.target.reset();
  };


  const handleClear = (event) => {
    const form = event.currentTarget.form
    form.reset()  
    onMovieChange('') 
    window.location.reload() // add page reload here to avoid having two arrays for movies or searchresultmovies
  }


  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input className="search-input" type="text" name="movie" placeholder="Enter a movie title" />
      <button className="search-button" type="submit">Search</button>
      <button className="clear-button" type="button" onClick={handleClear}>Clear</button>
    </form>
  );
}

export default SearchForm;