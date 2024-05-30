import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div className="movie-view-body">

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

            <button variant="primary" onClick={onBackClick}>Back</button>

        </div>
    );
};