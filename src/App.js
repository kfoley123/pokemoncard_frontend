import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import CollectionsPage from "./Pages/CollectionsPage";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import LogInPage from "./Pages/LogInPage";
import {
    useAllSets,
    useAllTypes,
    useAllCollections,
    useAllUsers,
} from "./Helpers/apiCalls";

function App() {
    //react query variables

    const [filterCollectionParams, setFilterCollectionParams] = useState({
        pokemonset: "",
        pokemontype: "",
        user: "",
    });

    const { data: collections, isSuccess: collectionSuccess } =
        useAllCollections(filterCollectionParams);
    const { data: sets, isSuccess: setsSuccess } = useAllSets();
    const { data: types, isSuccess: typesSuccess } = useAllTypes();
    const { data: users } = useAllUsers();

    const [loggedInUser, setLoggedInUser] = useState({
        userID: 0,
        username: "",
        profilePic:
            "https://www.pngitem.com/pimgs/m/338-3388231_thumb-image-pokemon-missingno-hd-png-download.png",
    });

    useEffect(() => {
        setFilterCollectionParams({
            pokemonset: "",
            pokemontype: "",
            user: loggedInUser.userID,
        });
    }, [loggedInUser]);

    function updateFormData(event, setterFunction) {
        setterFunction((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value,
            };
        });
    }

    console.log(loggedInUser);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Header
                            setLoggedInUser={setLoggedInUser}
                            loggedInUser={loggedInUser}
                        />
                    }
                >
                    <Route
                        index
                        element={
                            <Home
                                sets={sets}
                                setsSuccess={setsSuccess}
                                typesSuccess={typesSuccess}
                                types={types}
                                collections={collections}
                                collectionSuccess={collectionSuccess}
                                setLoggedInUser={setLoggedInUser}
                                loggedInUser={loggedInUser}
                                updateFormData={updateFormData}
                            />
                        }
                    />
                    <Route
                        path="logIn"
                        element={
                            <LogInPage
                                loggedInUser={loggedInUser}
                                updateFormData={updateFormData}
                                users={users}
                                setLoggedInUser={setLoggedInUser}
                            />
                        }
                    />
                    <Route
                        path="collections"
                        element={
                            loggedInUser.userID > 0 ? (
                                <CollectionsPage
                                    setsSuccess={setsSuccess}
                                    typesSuccess={typesSuccess}
                                    sets={sets}
                                    types={types}
                                    collections={collections}
                                    collectionSuccess={collectionSuccess}
                                    loggedInUser={loggedInUser}
                                    setFilterCollectionParams={
                                        setFilterCollectionParams
                                    }
                                />
                            ) : (
                                <>
                                    <h2>please log in to view collections</h2>
                                    <LogInPage
                                        loggedInUser={loggedInUser}
                                        updateFormData={updateFormData}
                                        users={users}
                                        setLoggedInUser={setLoggedInUser}
                                    />
                                </>
                            )
                        }
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
