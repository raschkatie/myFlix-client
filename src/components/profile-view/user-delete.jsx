import { useState } from "react";

export const UserDelete = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [storedToken, setStoredToken] = useState(localStorage.getItem("token"));

    fetch(`https://kr-my-flix.onrender.com/users/${user.username}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json"
        }
    })
    .then((response) => {
        if (response.ok) {
            alert("Account has been successfully deleted");
            localStorage.clear();
        } else {
            alert("Uh oh! There was an issue.");
        }
    });
};