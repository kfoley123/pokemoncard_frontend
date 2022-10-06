import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header(props) {
    const { setLoggedInUser, loggedInUser, loggedOut } = props;
    return (
        <>
            <h1 className="pageTitle">Pokemon Card Collector</h1>
            <NavBar />

            <div className="userInfo">
                <img
                    className="profilePic"
                    src={loggedInUser.profilePic}
                    alt="profile pic for user"
                />
                {loggedInUser.username ? (
                    <span className="username">{loggedInUser.username}</span>
                ) : (
                    <span className="username">Guest User</span>
                )}
                {loggedInUser.userID > 0 ? (
                    <button
                        className="logInOut"
                        onClick={() => {
                            setLoggedInUser(loggedOut);
                        }}
                    >
                        Log Out
                    </button>
                ) : (
                    <button className="logInOut">
                        <Link className="logInLink" to="/logIn">
                            Log In
                        </Link>
                    </button>
                )}
            </div>

            <Outlet />
        </>
    );
}
