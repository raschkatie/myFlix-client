import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const UserDelete = (onLoggedOut) => {
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
                onLoggedOut();
            } else {
                alert("Uh oh! There was an issue.");
            }
        });

    };


    return (
        <div className="section warning">
            <h4>Delete Account</h4>
            <p>Warning! This action cannot be undone.</p>
            <Link to="/login">
                <Button 
                    onClick={handleDelete}
                    className="delete-button"
                    >
                        Delete Account
                </Button>
            </Link>
        </div>
    );
};