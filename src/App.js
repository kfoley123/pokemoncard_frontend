import { useState, useEffect } from "react";
import EditPokemon from "./Components/EditPokemon/EditPokemon";
import AddPokemon from "./Components/AddPokemon/AddPokemon";
import Table from "./Components/Table/Table";
import Collections from "./Components/Collections/Collections";
import * as apiCalls from "./Helpers/apiCalls";
import Filter from "./Components/Filter/Filter";
import {
    useAllPokemonCards,
    useAllSets,
    useAllTypes,
    useAllCollections,
} from "./Helpers/apiCalls";

function App() {
    //state variables
    const [pokemonCards, setPokemonCards] = useState([]); //
    const [pokemonCardSets, setPokemonCardSets] = useState([]);
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [collectedArray, setCollectedArray] = useState([]);

    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [pokemonCardData, setPokemonCardData] = useState({});

    const [filterParams, setFilterParams] = useState({
        pokemonset: "",
        pokemontype: "",
    });
    const [filterCollectionParams, setFilterCollectionParams] = useState({
        pokemonset: "",
        pokemontype: "",
    });

    const { data, isLoading, isSuccess, isError } = useAllPokemonCards();
    const { data: sets, isSuccess: setsSuccess } = useAllSets();
    const { data: types, isSuccess: typesSuccess } = useAllTypes();

    const { data: collections, isSuccess: collectionSuccess } =
        useAllCollections();

    console.log(collections, collectionSuccess);

    //because there is nothing in dependency array, runs one time when you load the page

    useEffect(() => {
        if (filterParams.pokemontype === "" && filterParams.pokemonset === "") {
            // refreshPokemonCards();
        } else apiCalls.getFilteredPokemonCards(filterParams, setPokemonCards);
    }, [filterParams]);

    useEffect(() => {
        if (
            filterCollectionParams.pokemontype === "" &&
            filterCollectionParams.pokemonset === ""
        ) {
            // refreshPokemonCollections();
        } else
            apiCalls.getFilteredPokemonCollection(
                filterCollectionParams,
                setCollectedArray
            );
    }, [filterCollectionParams]);

    // runs an API call to update (PUT) selected card and then refreshes pokemon cards
    function updateSelectedCard() {
        apiCalls.putSelectedCard(pokemonCardData, selectedPokemon);
    }

    //runs an API call to save new pokemon card (POST) and refreshes pokemon cards
    function saveNewPokemon() {
        apiCalls.createNewPokemonCard(pokemonCardData);
    }

    // function that adds card to collection (PUT) if its a duplicate or POSTs card if its new to collection
    function addToCollection(card) {
        let cardMatch = false;
        collectedArray.forEach((item) => {
            if (item.collectedCard.id === card.id) {
                let collectionObj = {
                    user: item.user,
                    quantity: item.quantity + 1,
                    collectedCard: card.id,
                };
                apiCalls.updateSelectedCollection(item, collectionObj);
                cardMatch = true;
                return;
            }
        });

        if (!cardMatch) {
            let collectionObj = {
                user: "User1",
                quantity: "1",
                collectedCard: card.id,
            };

            apiCalls.createNewCollection(collectionObj);
        }
    }

    // function that removes a card from the collection or deletes that card from the collection if its the last one

    function removeFromCollection(card) {
        let numbOfCards = card.quantity;

        if (numbOfCards - 1 <= 0) {
            apiCalls.deleteSelectedCollection(card);
        } else {
            let collectionObj = {
                user: "User1",
                quantity: numbOfCards - 1,
                collectedCard: card.collectedCard.id,
            };

            apiCalls.updateSelectedCollection(card, collectionObj);
        }
    }

    // runs an API call that deleted selected card and refreshes pokemon cards
    function deletePokemon(cardID) {
        apiCalls.deleteSelectedCard(cardID);
    }

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
            {isSuccess && (
                <Table
                    setSelectedPokemon={setSelectedPokemon}
                    pokemonCards={data}
                    setPokemonCardData={setPokemonCardData}
                    deletePokemon={deletePokemon}
                    addToCollection={addToCollection}
                />
            )}

            {setsSuccess && typesSuccess && (
                <AddPokemon
                    types={types}
                    sets={sets}
                    saveNewPokemon={saveNewPokemon}
                    updateCardData={updateCardData}
                />
            )}

            {Object.keys(selectedPokemon).length !== 0 &&
                setsSuccess &&
                typesSuccess && (
                    <EditPokemon
                        sets={sets}
                        updateSelectedCard={updateSelectedCard}
                        setSelectedPokemon={setSelectedPokemon}
                        selectedPokemon={selectedPokemon}
                        types={types}
                        updateCardData={updateCardData}
                    />
                )}

            {setsSuccess && typesSuccess && collectionSuccess && (
                <Collections
                    collections={collections}
                    removeFromCollection={removeFromCollection}
                    sets={sets}
                    setFilterParams={setFilterParams}
                    types={types}
                    setFilterCollectionParams={setFilterCollectionParams}
                />
            )}
        </>
    );
}

export default App;
