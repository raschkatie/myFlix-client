import { React, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { setUser } from "../../redux/reducers/user/user";
import { useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";


import '../../index.scss';

export const LoginView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://kr-my-flix.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                dispatch(setUser(data.user, data.token));

                fetch("https://kr-my-flix.onrender.com/movies", {
                    headers: { Authorization: `Bearer ${data.token}` }
                })
                .then((response) => response.json())
                .then((movies) => {
                    const moviesApi = movies.map((movie) => ({
                        id: movie._id,
                        title: movie.Title,
                        description: movie.Description,
                        genre: movie.Genre,
                        director: movie.Director,
                        image: movie.ImagePath
                    }));
                    dispatch(setMovies(moviesApi));
                })
                .catch((error) => console.log("Error fetching movies:", error));
            } else {
                alert("User Not Found");
            }
        })
        .catch((e) => {
            alert("Something went wrong");
            console.log(e);
        })
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                    <Form.Control
                        className="form-field"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                    <Form.Control
                        className="form-field"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
};