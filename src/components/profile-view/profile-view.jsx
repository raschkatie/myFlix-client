import React from "react";
import { UserInfo } from "./user-info";
import { UserUpdate } from "./user-update";
import { UserDelete } from "./user-delete";

export const ProfileView = ({ user, movies }) => {
    const { Username, Password, Email, Birthday } = user;
    
    if (!user) {
        return;
    }

    return (   
        <>
            <div>
                <UserInfo
                    name={user.Username}
                    password={user.Password}
                    email={user.Email}
                    birthday={user.Birthday}
                />
            </div>
            <div>
                <UserUpdate />
            </div>
            <div>
                <UserDelete />
            </div>
        </>
    );

};