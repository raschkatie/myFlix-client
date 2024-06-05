import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

export const UserUpdate = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [username, setUsername] = useState(storedUser.Username);
    const [password, setPassword] = useState(storedUser.Password);
    const [email, setEmail] = useState(storedUser.Email);
    const [birthday, setBirthday] = useState(storedUser.Birthday);
    const [user, setUser] = useState();

    const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    };

    const handleSubmit = (event) => {
        event.preventDefault(event);

        fetch(`https://kr-my-flix.onrender.com/users/${user.username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.ok) {
                alert("Account Successfully Updated!");

                return response.json();
            } else {
                alert("Update Failed");
            }
        })
        .then((user) => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
            }
        })
        .catch((error) => {
            console.error(error);
        });
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
                minLength="3"
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

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
            <Form.Control
              className="form-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
            <Form.Control
              className="form-field"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    )

};