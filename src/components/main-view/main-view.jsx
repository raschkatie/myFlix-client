import React from "react";
import { useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { MoviesList } from "../movies-list/movies-list";

import "../../index.scss";

export const MainView = () => {
    const user = useSelector((state) => state.user.users);
    const token = useSelector((state) => state.user.token);
    const movies = useSelector((state) => state.movies.list);

    const dispatch = useDispatch();

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
                if (moviesApi.length === 0) {
                    return <Col>The list is empty!</Col>
                }
                dispatch(setMovies(moviesApi));
            });
    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={8}>
                                        <MovieView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : <MoviesList />
                                }
                            </>
                        }
                    />
                    {user && (
                        <Route
                            path="/profile"
                            element={
                                <ProfileView 
                                    movies={movies} 
                                />
                            }
                        />
                    )}
                </Routes>
            </Row>
        </BrowserRouter>
    );

};