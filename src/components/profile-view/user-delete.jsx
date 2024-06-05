import { useState } from "react";
import { Button } from "react-bootstrap";

export const UserDelete = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [storedToken, setStoredToken] = useState(localStorage.getItem("token"));

    const handleDelete = () => {
        fetch(`https://kr-my-flix.onrender.com/users/${encodeURIComponent(storedUser.Username)}`, {
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

    return (
        <div>
            <h4>Delete Account</h4>
            <p>Warning! This action cannot be undone.</p>
            <Button 
                onClick={handleDelete}>
                    Delete Account
            </Button>
        </div>
    );
};