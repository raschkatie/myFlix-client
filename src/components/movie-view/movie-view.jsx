import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>

            <div>
                <img src={movie.image} alt={movie.title} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.Name}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.Name}</span>
            </div>

            <button className="back-button" onClick={onBackClick}>Back</button>

        </div>
    );
};