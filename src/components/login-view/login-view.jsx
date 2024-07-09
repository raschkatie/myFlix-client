import { React, useState } from "react";
import { Form, Button } from "react-bootstrap";

import '../../index.scss';

export const LoginView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                dispatchEvent(setUser(data.user, data.token));
            } else {
                alert("User Not Found");
            }
        })
        .catch((e) => {
            alert("Something went wrong");
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