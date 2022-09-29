import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function Header(props) {
    const { setLoggedInUser, loggedInUser, loggedOut } = props;
    return (
        <>
            <h1>Pokemon Card Collector</h1>
            <NavBar />

            <div className="userInfo">
                <img
                    className="profilePic"
                    src={loggedInUser.profilePic}
                    alt="profile pic for user"
                />
                <span className="username">{loggedInUser.username}</span>
                {loggedInUser.userID > 0 && (
                    <button
                        className="logOut"
                        onClick={() => {
                            setLoggedInUser(loggedOut);
                        }}
                    >
                        Log Out
                    </button>
                )}
            </div>

            <Outlet />
        </>
    );
}
