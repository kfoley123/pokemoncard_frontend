import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <ul className="navLinks">
                <li>
                    <Link className="navLink" to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="navLink" to="/logIn">
                        Log In Page
                    </Link>
                </li>
                <li>
                    <Link className="navLink" to="/collections">
                        Collections
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
