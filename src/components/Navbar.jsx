import { Link } from "react-router-dom";
import './Navbar.css';
import SearchForm from "./SearchForm";
import SortDropDown from "./SortDropDown";
import { useContext } from "react";
import { MovieContext } from '../context/MovieContext';

function Navbar() {
    const { setSearchQuery } = useContext(MovieContext);
    // passed down to the child component, so thta it can set the new movie from the form 
    const handleMovieChange = (newMovie) => {
        setSearchQuery(newMovie);
};
  
  return (
    <header className="navbar">
      {/* Left: Title */}
        <Link className="website-title" onClick={window.location.reload} to="/">
        <img src="/logo.png"/>
        Flixter
        </Link>
        {/* Right: search bar (and its buttons), sort drop down */}
     <div className="navbar-actions">
        <SearchForm onMovieChange={handleMovieChange} />
        <SortDropDown/>
    </div> 
    </header>
  );    
}



export default Navbar;