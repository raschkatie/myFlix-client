import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movie }) => {
    const { movieId } = useParams();
    const movieItem = movies.find((m) => m.id === movieId);
    
    return (
        <div>

            <div>
                <img className="movie-image" src={movieItem.image} alt={movieItem.title} />
            </div>
            <div>
                <span className="bold-title">Title: </span>
                <span>{movieItem.title}</span>
            </div>
            <div>
                <span className="bold-title">Description: </span>
                <span>{movieItem.description}</span>
            </div>
            <div>
                <span className="bold-title">Director: </span>
                <span>{movieItem.director.Name}</span>
            </div>
            <div>
                <span className="bold-title">Genre: </span>
                <span>{movieItem.genre.Name}</span>
            </div>

            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
            
        </div>
    );
};