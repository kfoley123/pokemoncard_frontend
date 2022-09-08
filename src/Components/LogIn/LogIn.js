import React, { useState } from "react";
import { useLogIn } from "../../Helpers/apiCalls";

export default function LogIn(props) {
    const { updateLogInRequest, users } = props;

    const [logInRequest, setLogInRequest] = useState({});

    const { mutate: logIn } = useLogIn();

    function formHandler(event) {
        updateLogInRequest(event, setLogInRequest);
    }

    return (
        <form>
            <h2>Log In</h2>
            <span className="error"></span>

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
                    users.forEach((userObj) => {
                        if (userObj.username === logInRequest.username) {
                            console.log("dog");
                            let LogInData = {
                                id: userObj.id,
                                loggedIn: true,
                                ...logInRequest,
                            };
                            logIn(LogInData);
                        }
                    });
                }}
            >
                Submit
            </button>
        </form>
    );
}
