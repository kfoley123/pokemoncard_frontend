import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import CollectionsPage from "./Pages/CollectionsPage";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import {
    useAllPokemonCards,
    useAllSets,
    useAllTypes,
    useAllCollections,
} from "./Helpers/apiCalls";

function App() {
    //state variables

    const [selectedPokemon, setSelectedPokemon] = useState(0);
    const [pokemonCardData, setPokemonCardData] = useState({});

    const [filterParams, setFilterParams] = useState({
        pokemonset: "",
        pokemontype: "",
    });
    const [filterCollectionParams, setFilterCollectionParams] = useState({
        pokemonset: "",
        pokemontype: "",
    });

    //react query variables

    const { data: cards, isSuccess: cardsSuccess } =
        useAllPokemonCards(filterParams);
    const { data: sets, isSuccess: setsSuccess } = useAllSets();
    const { data: types, isSuccess: typesSuccess } = useAllTypes();
    const { data: collections, isSuccess: collectionSuccess } =
        useAllCollections(filterCollectionParams);

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
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={
                            <Home
                                updateFormData={updateFormData}
                                setFilterParams={setFilterParams}
                                sets={sets}
                                setsSuccess={setsSuccess}
                                typesSuccess={typesSuccess}
                                types={types}
                                cardsSuccess={cardsSuccess}
                                setSelectedPokemon={setSelectedPokemon}
                                cards={cards}
                                setPokemonCardData={setPokemonCardData}
                                pokemonCardData={pokemonCardData}
                                collections={collections}
                                selectedPokemon={selectedPokemon}
                            />
                        }
                    />
                    <Route
                        path="collections"
                        element={
                            <CollectionsPage
                                setFilterCollectionParams={
                                    setFilterCollectionParams
                                }
                                setsSuccess={setsSuccess}
                                typesSuccess={typesSuccess}
                                sets={sets}
                                collectionSuccess={collectionSuccess}
                                types={types}
                                collections={collections}
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
