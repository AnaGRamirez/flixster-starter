
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import './Home.css';
function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content-wrapper">
           <Sidebar id="sidebar"/>
        <main className="main-content">
          <MovieGrid />
        </main>
      </div>
    </div>
  );
}

export default Home;
