import { useState, useEffect } from "react";
import EditPokemon from "./Components/EditPokemon/EditPokemon";
import AddPokemon from "./Components/AddPokemon/AddPokemon";
import FilterByType from "./Components/FilterByType/FilterByType";
import Table from "./Components/Table/Table";
import Collections from "./Components/Collections/Collections";
import * as apiCalls from "./Helpers/apiCalls";
import FilterBySet from "./Components/FilterBySet/FilterBySet";

function App() {
    //state variables
    const [pokemonCards, setPokemonCards] = useState([]);
    const [pokemonCardSets, setPokemonCardSets] = useState([]);
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [collectedArray, setCollectedArray] = useState([]);

    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [pokemonCardData, setPokemonCardData] = useState({});

    const [filterParams, setFilterParams] = useState({
        pokemonset: "",
        pokemontype: "",
    });

    //because there is nothing in dependency array, runs one time when you load the page
    useEffect(() => {
        refreshPokemonTypes();
        refreshPokemonCards();
        refreshPokemonCardSets();
        refreshPokemonCollections();
    }, []);

    useEffect(() => {
        if (filterParams.pokemontype === "") {
            refreshPokemonCards();
        } else
            apiCalls.getFilteredType(filterParams.pokemontype, setPokemonCards);
    }, [filterParams.pokemontype]);

    useEffect(() => {
        if (filterParams.pokemonset === "") {
            refreshPokemonCards();
        } else
            apiCalls.getFilteredSet(filterParams.pokemonset, setPokemonCards);
    }, [filterParams.pokemonset]);

    //runs an API call to GET all pokemon types and sets PokemonTypes variable to the response
    function refreshPokemonTypes() {
        apiCalls.getAllPokemonTypes(setPokemonTypes);
    }

    // runs an API call to GET all pokemon collections, saves them into the collectedArray
    function refreshPokemonCollections() {
        apiCalls.getAllPokemonCollections(setCollectedArray);
    }

    //runs an API call to GET Pokemon Cards and sets PokemonCards variable to the response
    function refreshPokemonCards() {
        apiCalls.getAllPokemonCards(setPokemonCards);
    }

    // runs an API call to GET all pokemon sets and sets PokemonCardSets to the response

    function refreshPokemonCardSets() {
        apiCalls.getAllPokemonSets(setPokemonCardSets);
    }

    // runs an API call to update (PUT) selected card and then refreshes pokemon cards
    function updateSelectedCard() {
        apiCalls.putSelectedCard(
            pokemonCardData,
            selectedPokemon,
            refreshPokemonCards
        );
    }

    //runs an API call to save new pokemon card (POST) and refreshes pokemon cards
    function saveNewPokemon() {
        apiCalls.createNewPokemonCard(pokemonCardData, refreshPokemonCards);
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
                apiCalls.updateSelectedCollection(
                    item,
                    collectionObj,
                    refreshPokemonCollections
                );
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

            apiCalls.createNewCollection(
                collectionObj,
                refreshPokemonCollections
            );
        }
    }

    // function that removes a card from the collection or deletes that card from the collection if its the last one

    function removeFromCollection(card) {
        let numbOfCards = card.quantity;

        if (numbOfCards - 1 <= 0) {
            apiCalls.deleteSelectedCollection(card, refreshPokemonCollections);
        } else {
            let collectionObj = {
                user: "User1",
                quantity: numbOfCards - 1,
                collectedCard: card.collectedCard.id,
            };

            apiCalls.updateSelectedCollection(
                card,
                collectionObj,
                refreshPokemonCollections
            );
        }
    }

    // runs an API call that deleted selected card and refreshes pokemon cards
    function deletePokemon(cardID) {
        apiCalls.deleteSelectedCard(cardID, refreshPokemonCards);
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

    // function filterCards(event){
    //     setFilteredPokemonCards((prevData) => {
    //         return {
    //             ...prevData,
    //             []
    //         }
    //     })
    // }

    return (
        <>
            <h1> Pokemon Card Collection App </h1>

            <Table
                setSelectedPokemon={setSelectedPokemon}
                pokemonCards={pokemonCards}
                setPokemonCardData={setPokemonCardData}
                deletePokemon={deletePokemon}
                addToCollection={addToCollection}
            />

            <AddPokemon
                pokemonTypes={pokemonTypes}
                pokemonCardSets={pokemonCardSets}
                saveNewPokemon={saveNewPokemon}
                updateCardData={updateCardData}
            />

            {Object.keys(selectedPokemon).length !== 0 && (
                <EditPokemon
                    pokemonCardSets={pokemonCardSets}
                    updateSelectedCard={updateSelectedCard}
                    setSelectedPokemon={setSelectedPokemon}
                    selectedPokemon={selectedPokemon}
                    pokemonTypes={pokemonTypes}
                    updateCardData={updateCardData}
                />
            )}

            <FilterByType
                setFilterParams={setFilterParams}
                pokemonTypes={pokemonTypes}
            />

            <FilterBySet
                setFilterParams={setFilterParams}
                pokemonCardSets={pokemonCardSets}
            />

            <Collections
                collectedArray={collectedArray}
                removeFromCollection={removeFromCollection}
            />
        </>
    );
}

export default App;
