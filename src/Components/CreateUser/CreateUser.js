import React, { useState } from "react";
import { useCreateUser, useAllUsers } from "../../Helpers/apiCalls";
import { validateUser } from "../../Helpers/formValidator";

export default function CreateUser() {
    let defaultUser = {
        username: "",
        password: "",
        email: "",
        profilePic: "",
    };
    const [userData, setUserData] = useState(defaultUser);
    const { mutate: createUser } = useCreateUser();

    const { data: usernames, isSuccess: usersSuccess } = useAllUsers();

    const [validationMessage, setValidationMessage] = useState("");

    function updateUserData(event) {
        setUserData((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value,
            };
        });
    }

    return (
        <form>
            <h2>Create New User</h2>
            <span className="error">{validationMessage}</span>

            <input
                onChange={updateUserData}
                name="username"
                type="text"
                placeholder="Username"
                value={userData.username}
            ></input>

            <input
                onChange={updateUserData}
                name="password"
                type="text"
                placeholder="Password"
                value={userData.password}
            ></input>

            <input
                onChange={updateUserData}
                name="email"
                type="text"
                placeholder="e-mail"
                value={userData.email}
            ></input>

            <input
                onChange={updateUserData}
                name="profilePic"
                type="text"
                placeholder="Profile Pic URL"
                value={userData.profilePic}
            ></input>

            <button
                onClick={(event) => {
                    event.preventDefault();

                    let validationResponse = validateUser(userData, usernames);
                    if (validationResponse.valid) {
                        createUser(userData);
                        setValidationMessage("");
                        setUserData(defaultUser);
                    } else {
                        setValidationMessage(validationResponse.message);
                    }
                }}
            >
                Submit
            </button>
        </form>
    );
}
