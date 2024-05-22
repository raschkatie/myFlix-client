import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Inception",
            image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
            description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
            director: "Christopher Nolan",
            genre: "Sci-Fi"
        },
        {
            id: 2,
            title: "Howl's Moving Castle",
            image: "https://m.media-amazon.com/images/I/81rI2RP4FiL._AC_UL320_.jpg",
            description: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.",
            director: "Hayao Miyazaki",
            genre: "Fantasy"
        },
        {
            id: 3,
            title: "It Follows",
            image: "https://m.media-amazon.com/images/M/MV5BMmU0MjBlYzYtZWY0MC00MjliLWI3ZmUtMzhlZDVjMWVmYWY4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
            description: "A young woman is followed by an unknown supernatural force after a sexual encounter.",
            director: "David Robert Mitchell",
            genre: "Horror"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

<<<<<<< Updated upstream
=======
    useEffect(() => {
        fetch("https://kr-my-flix.onrender.com/movies")
            .then((response) => response.json())
            .then((movies) => {
                const moviesApi = movies.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.title,
                        description: movie.description,
                        genre: movie.genre,
                        director: movie.director
                    }
                });
                setMovies(moviesApi);
            })
    }, []);

>>>>>>> Stashed changes
    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    } else {
        return (
            <div>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                ))}
            </div>
        );
    }
};