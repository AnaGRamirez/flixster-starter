import "./SortDropDown.css";
import {useContext} from "react";
import {MovieContext} from "../context/MovieContext";

function SortDropDown() {
  const {sortMovies} = useContext(MovieContext);

  const handleSortChange = (e) => {
    sortMovies(e.target.value);
  };

  return (
    <div className="sortDropDown">
      <select
        className="sort-dropdown"
        onChange={handleSortChange}
        defaultValue=""
      >
        <option>Sort</option>
        <option value="title"> Title (A-Z)</option>
        <option value="date"> Newest to Oldest </option>
        <option value="average"> Highest Votes </option>
      </select>
    </div>
  );
}

export default SortDropDown;
