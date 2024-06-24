import React from "react";
import { PropTypes } from "prop-types";

export const UserInfo = ({ name, email, birthday }) => {
    return (
        <div>

            <div>
                <h1>User Information</h1>
            </div>
            <div>
                <span className="bold-title">Username: </span>
                <span>{name}</span>
            </div>
            <div>
                <span className="bold-title">Email: </span>
                <span>{email}</span>
            </div>
            <div>
                <span className="bold-title">Birthday: </span>
                <span>{birthday}</span>
            </div>

        </div>
    );
};

UserInfo.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired
};