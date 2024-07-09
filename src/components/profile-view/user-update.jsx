import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

export const UserUpdate = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [username, setUsername] = useState(storedUser.Username);
    const [password, setPassword] = useState(storedUser.Password);
    const [email, setEmail] = useState(storedUser.Email);
    const [birthday, setBirthday] = useState(storedUser.Birthday);
    const [token, setStoredToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState();

    const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    };

    console.log(data);

    const handleSubmit = (event) => {

        useEffect(() => {
          fetch(`https://kr-my-flix.onrender.com/users/${encodeURIComponent(storedUser.Username)}`, {
              method: "PUT",
              body: JSON.stringify(event),
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
                  localStorage.setItem("user", JSON.stringify(event));
                  setUser(user);
              }
          })
          .catch((error) => {
              console.error(error);
          });

        }, [user]);
    };

    return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>New Username:</Form.Label>
              <Form.Control
                className="form-field"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="3"
                required
              />
          </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>New Password:</Form.Label>
            <Form.Control
              className="form-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>New Email:</Form.Label>
            <Form.Control
              className="form-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>New Birthday:</Form.Label>
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