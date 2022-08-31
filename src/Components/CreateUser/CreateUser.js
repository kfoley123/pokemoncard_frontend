import React, { useState } from "react";
import { useCreateUser, useAllUsers } from "../../Helpers/apiCalls";
import { validateUser } from "../../Helpers/formValidator";

export default function CreateUser(props) {
    let defaultUser = {
        username: "",
        password: "",
        email: "",
        profilePic: "",
    };

    const { updateUserData } = props;
    const [userData, setUserData] = useState(defaultUser);
    const { mutate: createUser } = useCreateUser();

    const { data: usernames, isSuccess: usersSuccess } = useAllUsers();

    const [validationMessage, setValidationMessage] = useState("");

    function formHandler(event) {
        updateUserData(event, setUserData);
    }

    return (
        <form>
            <h2>Create New User</h2>
            <span className="error">{validationMessage}</span>

            <input
                onChange={formHandler}
                name="username"
                type="text"
                placeholder="Username"
                value={userData.username}
            ></input>

            <input
                onChange={formHandler}
                name="password"
                type="text"
                placeholder="Password"
                value={userData.password}
            ></input>

            <input
                onChange={formHandler}
                name="email"
                type="text"
                placeholder="e-mail"
                value={userData.email}
            ></input>

            <input
                onChange={formHandler}
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
