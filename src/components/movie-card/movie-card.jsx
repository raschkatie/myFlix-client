import React from "react";
import { PropTypes } from "prop-types";
import { Card, Button } from "react-bootstrap"; 
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieCard = ({ movie, onToggleFavorite }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);
        onToggleFavorite(movie.id, !isFavorite);
    };
    
    return (
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Card className="h-100">
                <Card.Img variant="top" src={movie.image} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                    <Button variant="primary" onClick={handleToggleFavorite}>
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </Button>
                </Card.Body>
            </Card>
        </Link>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired
        }),
        genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        })
    }).isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
};