import { useState } from "react";
import EditPokemon from "./Components/EditPokemon/EditPokemon";
import AddPokemon from "./Components/AddPokemon/AddPokemon";
import Table from "./Components/Table/Table";
import Collections from "./Components/Collections/Collections";
import Filter from "./Components/Filter/Filter";

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

    // function that allows you to update any key:value pair depending on which one you select- each select/input in edit pokemon has a name and value is what is entered/selected
    function updateCardData(event) {
        setPokemonCardData((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value,
            };
        });
    }

    return (
        <>
            <h1> Pokemon Card Collection App </h1>

            <div className="filters">
                {setsSuccess && (
                    <Filter
                        setFilterParams={setFilterParams}
                        filterOptions={sets}
                        filterName="Set"
                        filterKey="pokemonset"
                    />
                )}

                {typesSuccess && (
                    <Filter
                        setFilterParams={setFilterParams}
                        filterOptions={types}
                        filterName="Type"
                        filterKey="pokemontype"
                    />
                )}
            </div>
            {cardsSuccess && (
                <Table
                    setSelectedPokemon={setSelectedPokemon}
                    pokemonCards={cards}
                    setPokemonCardData={setPokemonCardData}
                    collections={collections}
                />
            )}

            {setsSuccess && typesSuccess && (
                <AddPokemon
                    types={types}
                    sets={sets}
                    cardData={pokemonCardData}
                    updateCardData={updateCardData}
                />
            )}

            {selectedPokemon !== 0 && setsSuccess && typesSuccess && (
                <EditPokemon
                    sets={sets}
                    setSelectedPokemon={setSelectedPokemon}
                    selectedPokemon={selectedPokemon}
                    types={types}
                    updateCardData={updateCardData}
                    cardData={pokemonCardData}
                />
            )}

            <h1> Collection</h1>

            {setsSuccess && (
                <Filter
                    setFilterParams={setFilterCollectionParams}
                    filterOptions={sets}
                    filterName="Set"
                    filterKey="pokemonset"
                />
            )}

            {typesSuccess && (
                <Filter
                    setFilterParams={setFilterCollectionParams}
                    filterOptions={types}
                    filterName="Type"
                    filterKey="pokemontype"
                />
            )}

            {collectionSuccess && <Collections collections={collections} />}
        </>
    );
}

export default App;
