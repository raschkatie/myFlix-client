import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movie }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);
    
    return (
        <div>

            <div>
                <img className="movie-image" src={movie.image} alt={movie.title} />
            </div>
            <div>
                <span className="bold-title">Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span className="bold-title">Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span className="bold-title">Director: </span>
                <span>{movie.director.Name}</span>
            </div>
            <div>
                <span className="bold-title">Genre: </span>
                <span>{movie.genre.Name}</span>
            </div>

            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
            
        </div>
    );
};