import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function Header() {
    return (
        <>
            <h1>Pokemon Card Collector</h1>
            <NavBar />
            <Outlet />
        </>
    );
}
