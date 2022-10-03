import React, { useState } from "react";
import "./LogIn.css";
import { useLogIn } from "../../Helpers/apiCalls";

export default function LogIn(props) {
    const { updateLogInRequest, users, setLoggedInUser } = props;

    const [errorMessage, setErrorMessage] = useState("");
    const [logInRequest, setLogInRequest] = useState({});

    const { mutate: logIn } = useLogIn(setLoggedInUser, setErrorMessage);

    function formHandler(event) {
        updateLogInRequest(event, setLogInRequest);
    }

    return (
        <form className="logInForm">
            <h2>Log In</h2>
            <span className="error">{errorMessage}</span>

            <input
                onChange={formHandler}
                name="username"
                type="text"
                placeholder="Username"
            ></input>

            <input
                onChange={formHandler}
                name="password"
                type="text"
                placeholder="Password"
            ></input>

            <button
                onClick={(event) => {
                    event.preventDefault();
                    let loginSuccess = false;
                    users.forEach((userObj) => {
                        if (userObj.username === logInRequest.username) {
                            let LogInData = {
                                id: userObj.id,
                                loggedIn: true,
                                ...logInRequest,
                            };
                            loginSuccess = true;
                            logIn(LogInData);
                        }
                    });
                    if (loginSuccess !== true) {
                        setErrorMessage(
                            "Log in error. Please check your credentials and try again"
                        );
                    }
                }}
            >
                Submit
            </button>
        </form>
    );
}
