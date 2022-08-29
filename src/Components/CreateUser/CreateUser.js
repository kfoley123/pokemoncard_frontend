import React, { useState } from "react";
import { useCreateUser } from "../../Helpers/apiCalls";

export default function CreateUser() {
    const [userData, setUserData] = useState({});
    const { mutate: createUser } = useCreateUser();

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

            <input
                onChange={updateUserData}
                name="username"
                type="text"
                placeholder="Username"
            ></input>

            <input
                onChange={updateUserData}
                name="password"
                type="text"
                placeholder="Password"
            ></input>

            <input
                onChange={updateUserData}
                name="email"
                type="text"
                placeholder="e-mail"
            ></input>

            <input
                onChange={updateUserData}
                name="profilePic"
                type="text"
                placeholder="Profile Pic URL"
            ></input>

            <button
                onClick={(event) => {
                    event.preventDefault();
                    createUser(userData);
                }}
            >
                Submit
            </button>
        </form>
    );
}
