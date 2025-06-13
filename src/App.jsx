import './App.css'
import {MovieProvider} from './context/MovieContext.jsx'
import Watch from './pages/Watch.jsx';
import Favorites from './pages/Favorites.jsx';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';

const App = () => {

  return (
   <MovieProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/watch" element={<Watch/>}/>
        </Routes>
      </div>
    </MovieProvider>
  );
  
}

export default App;
