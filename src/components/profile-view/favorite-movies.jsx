import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ movies, user }) => {
    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id));
    
    if (!movies || !user.FavoriteMovies) {
        return (
            <div>
                Uh oh! Looks like you don't have any favorite movies yet.
            </div>
        )
    }

    if (!Array.isArray(movies)) {
        return;
    }

    return (
        <div>
            <h2>Favorite Movies</h2>
            <Row>
                {favoriteMovies.map((movie) => (
                    <Col key={movie.id} md={4}>
                            <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};