import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function Header(props) {
    const { setLoggedInUser, loggedInUser } = props;
    return (
        <>
            <h1>Pokemon Card Collector</h1>
            <NavBar />
            {loggedInUser.userID > 0 && (
                <button
                    onClick={() => {
                        setLoggedInUser(0);
                    }}
                >
                    Log Out
                </button>
            )}
            <Outlet />
        </>
    );
}
