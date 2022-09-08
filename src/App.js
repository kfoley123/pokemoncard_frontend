import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import CollectionsPage from "./Pages/CollectionsPage";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import { useAllSets, useAllTypes, useAllCollections } from "./Helpers/apiCalls";

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

    const [loggedInUser, setLoggedInUser] = useState(0);

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
