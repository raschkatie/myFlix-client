import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ movies, user }) => {
    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id));
    
    return (
        <Row>
            <Col md={12}>
                <h2>Favorite Movies</h2>
            </Col>
            <Row>
                {favoriteMovies.map((movie) => {
                    return (
                        <Col md={4}>
                            <Link to={`/movies/${movie.id}`}>
                                <MovieCard
                                    movie={movie}
                                    isFavorite={user.favoriteMovies}
                                />
                            </Link>
                        </Col>
                    );
                })}
            </Row>
        </Row>
    )
};