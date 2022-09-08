import React, { useState } from "react";
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
    });

    const { data: collections, isSuccess: collectionSuccess } =
        useAllCollections(filterCollectionParams);
    const { data: sets, isSuccess: setsSuccess } = useAllSets();
    const { data: types, isSuccess: typesSuccess } = useAllTypes();
    const { data: users } = useAllUsers();

    const [loggedInUser, setLoggedInUser] = useState(0);

    function updateFormData(event, setterFunction) {
        setterFunction((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value,
            };
        });
    }

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
                            <CollectionsPage
                                setsSuccess={setsSuccess}
                                typesSuccess={typesSuccess}
                                sets={sets}
                                types={types}
                                collections={collections}
                                collectionSuccess={collectionSuccess}
                                setFilterCollectionParams={
                                    setFilterCollectionParams
                                }
                            />
                        }
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
