import './MovieCard.css';
import { useContext } from 'react';
import {MovieContext} from '../context/MovieContext';

function MovieCard({props}){

   const {toggleFavorite, toggleWatched, openModal} = useContext(MovieContext);

    return (
          <div className="movie-card">

                {/* poster pic */}
                <img className="poster"
                    src={props.poster_path}
                    alt= {props.title}
                    onClick = {()=> {                                               
                    openModal(props);
                }}
                />
                
                {/* title */}
                <h3 className="movie-title"> {props.title} </h3>


            
                <div className="movie-toggles">
                    <div className="rating">
                        <img src="/star.png" alt="star"/>
                        <span>{props.vote_average}</span>
                    </div>  

                    <img 
                        className="toggle-item" 
                        src= {props.isFavorite ? '/heart.png': '/heart-blank.png'}
                        alt="Favorite icon"
                        onClick={()=> toggleFavorite(props.id)}
                    /> 
                    <img 
                        className="toggle-item" 
                        src={props.isWatched ? '/eye-filled.png': '/eye.png'}
                        alt= "Watched"
                        onClick={()=>toggleWatched(props.id)}
                    />
                </div>

            </div>
        )
}

export default MovieCard;