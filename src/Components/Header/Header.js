import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function Header(props) {
    const { setLoggedInUser, loggedInUser } = props;
    return (
        <>
            <h1>Pokemon Card Collector</h1>
            <NavBar />
            <span>{loggedInUser.username}</span>

            <img
                className="profilePic"
                src={loggedInUser.profilePic}
                alt="profile pic for user"
            />

            {loggedInUser.userID > 0 && (
                <button
                    onClick={() => {
                        setLoggedInUser({
                            userID: 0,
                            username: "",
                            profilePic:
                                "https://www.pngitem.com/pimgs/m/338-3388231_thumb-image-pokemon-missingno-hd-png-download.png",
                        });
                    }}
                >
                    Log Out
                </button>
            )}
            <Outlet />
        </>
    );
}
