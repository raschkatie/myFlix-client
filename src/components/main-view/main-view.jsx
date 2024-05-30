import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Button } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://kr-my-flix.onrender.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((movies) => {
                const moviesApi = movies.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        description: movie.Description,
                        genre: movie.Genre,
                        director: movie.Director,
                        image: movie.ImagePath
                    };
                });
                setMovies(moviesApi);
            });
    }, [token]);

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <>
                    <Col md={8}>
                        <MovieView
                            movie={selectedMovie}
                            onBackClick={() => setSelectedMovie(null)}
                        />
                        <Button
                            variant="primary"
                            onClick={() => {
                                setUser(null);
                                setToken(null);
                                localStorage.clear();
                            }}
                        >
                            Log Out
                        </Button>
                    </Col>
                </>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            )
        }
        </Row>
    )

};