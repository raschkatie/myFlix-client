import React from "react";
import { PropTypes } from "prop-types";
import { Card, Button } from "react-bootstrap"; 
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { setUser } from "../../redux/reducers/user/user";

import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [addTitle, setAddTitle] = useState("");
    const [removeTitle, setRemoveTitle] = useState("");
    const [buttonText, setButtonText] = useState((user.FavoriteMovies.includes(movie.id)) ? "Remove from Favorites" : "Add to Favorites");


    useEffect(() => {
        const addToFavorites = () => {
            fetch(`https://kr-my-flix.onrender.com/users/${encodeURIComponent(user.Username)}/favorites/${movie.id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                })
            .then((response) => {
                if (!response.ok) {
                    alert("Uh oh! Couldn't add to Favorites");
                } else {
                    alert("Movie added to Favorites");
                    setButtonText("Remove from Favorites");
                    return response.json();
            }})
            .then((user) => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    setUser(user);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        };

        const removeFromFavorites = () => {
            fetch(`https://kr-my-flix.onrender.com/users/${encodeURIComponent(user.Username)}/favorites/${movie.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                })
            .then((response) => {
                if (!response.ok) {
                    alert("Uh oh! Couldn't remove from Favorites");
                } else {
                    setButtonText("Add to Favorites");
                    alert("Movie removed from Favorites");
                    return response.json();
            }})
            .then((user) => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    setUser(user);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        };

        if (addTitle) {
            addToFavorites();
        }
        if (removeTitle) {
            removeFromFavorites();
        }
    }, [addTitle, removeTitle, token]);

    const handleAddToFavorites = () => {
        setAddTitle(movie.title);
    }

    const handleRemoveFromFavorites = () => {
        setRemoveTitle(movie.title);
    }
    
    return (
        <>
            <Link to={`/movies/${movie.id}`}>
                <Card className="movie-card">
                    <Card.Img variant="top" src={movie.image} />
                    <h4 className="hide-description">See Details</h4>
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
            <Card>
                {(user.FavoriteMovies.includes(movie.id)) ? (
                    <Button 
                        variant="primary"
                        onClick={handleRemoveFromFavorites}
                    >
                        {buttonText}
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        onClick={handleAddToFavorites}
                    >
                        {buttonText}
                    </Button>
                )}
            </Card>
        </>
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
};