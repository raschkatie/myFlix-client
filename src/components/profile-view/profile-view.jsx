import React from "react";
import { UserInfo } from "./user-info";
import { UserUpdate } from "./user-update";
import { UserDelete } from "./user-delete";
import { FavoriteMovies } from "./favorite-movies";

import "../../index.scss";

export const ProfileView = ({ user, movies }) => {    
    if (!user) {
        return;
    }

    return (   
        <>
            <div className="section">
                <UserInfo
                    name={user.Username}
                    password={user.Password}
                    email={user.Email}
                    birthday={user.Birthday}
                />
            </div>
            <div className="section">
                <FavoriteMovies movies={movies} user={user} />
            </div>
            <div className="section">
                <p>Fill out the form below to update your account information.</p>
                <UserUpdate />
            </div>
            <div className="section">
                <UserDelete />
            </div>
        </>
    );

};