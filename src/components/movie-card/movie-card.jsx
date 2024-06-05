import React from "react";
import { PropTypes } from "prop-types";
import { Card, Button } from "react-bootstrap"; 
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieCard = ({ movie, isFavorite }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [addTitle, setAddTitle] = useState("");
    const [removeTitle, setRemoveTitle] = useState("");

    useEffect(() => {
        const addToFavorites = () => {
            fetch(`https://kr-my-flix.onrender.com/users/${encodeURIComponent(user.username)}/favorites/${encodeURIComponent(movie.title)}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                })
            .then((response) => {
                if (!response.ok) {
                    alert("Uh oh! Something went wrong");
                }
                alert("Movie added to Favorites");
                return response.json();
            })
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
            fetch(`https://kr-my-flix.onrender.com/users/${encodeURIComponent(user.username)}/favorites/${encodeURIComponent(movie.title)}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                })
            .then((response) => {
                if (!response.ok) {
                    alert("Uh oh! Something went wrong");
                }
                alert("Movie removed from Favorites");
                return response.json();
            })
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
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Card className="mh-100">
                    <Card.Img variant="top" src={movie.image} />
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text>{movie.description}</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
            <Card>
                {isFavorite ? (
                    <Button 
                        variant="primary"
                        onClick={handleRemoveFromFavorites}
                    >
                        Remove from Favorites
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        onClick={handleAddToFavorites}
                    >
                        Add to Favorites
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