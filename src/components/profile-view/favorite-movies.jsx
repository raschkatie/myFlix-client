import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

import "../../index.scss";

export const FavoriteMovies = ({ movies, user }) => {
    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));
    
    if (!movies || !user.FavoriteMovies) {
        return <div>Looks like you don't have any favorite movies yet!</div>
    }

    return (
        <Row>
            <Col md={12}>
                <h2>Favorite Movies</h2>
            </Col>
            <Row>
                {favoriteMovies.map((movie) => {
                    return (
                        <Col md={4}>
                            <Link to={`/movies/${movie._id}`}>
                                <MovieCard
                                    movie={movie}
                                    isFavorite={user.FavoriteMovies.includes(movie.id)}
                                />
                            </Link>
                        </Col>
                    );
                })}
            </Row>
        </Row>
    );
};