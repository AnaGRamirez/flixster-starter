import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import "./Home.css";
function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar id="sidebar" />
        <main className="main-content">
          <MovieGrid />
        </main>
      </div>

      <footer className="site-footer">
        <p className="footer-catchphrase">
          Thanks for stopping by — see you in the terminal!
        </p>
        <p>&copy; 2025 Ana Ramirez</p>
      </footer>
    </div>
  );
}

export default Home;
