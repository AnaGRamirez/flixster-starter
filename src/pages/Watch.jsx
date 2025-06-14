import React, { useContext } from 'react';
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import './Home.css';

const Watch = () => {

 return (
    <div className="home-container">
      <div className="content-wrapper">
           <Sidebar id="sidebar"/>
        <main className="main-content">
          <MovieGrid />
        </main>
      </div>
    </div>
  );

  
}
export default Watch;
