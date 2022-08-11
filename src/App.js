import { useState, useEffect, useCallback } from "react";
import EditPokemon from "./EditPokemon/EditPokemon";
import AddPokemon from "./AddPokemon/AddPokemon";
import FilterByType from "./FilterByType/FilterByType";
import Table from "./Table/Table";
import Collections from "./Collections";
import * as apiCalls from "./apiCalls";

function App() {
    const [pokemonCards, setPokemonCards] = useState([]);
    const [pokemonCardSets, setPokemonCardSets] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [typeFilter, setTypeFilter] = useState("");
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [collectedArray, setCollectedArray] = useState([]);
    const [pokemonCardData, setPokemonCardData] = useState({});

    //because there is nothing in dependency array, runs one time when you load the page
    useEffect(() => {
        refreshPokemonTypes();
        refreshPokemonCards();
        refreshPokemonCardSets();
        refreshPokemonCollections();
    }, []);

    //runs a fetch that gets all the pokemon types and sets them into variable. Its a function so we can call it later when needed
    function refreshPokemonTypes() {
        apiCalls.getAllPokemonTypes(setPokemonTypes);
    }

    function refreshPokemonCollections() {
        apiCalls.getAllPokemonCollections(setCollectedArray);
    }

    //runs a fetch that gets all the pokemoncards and sets them into variable. Its a function so we can call it later when needed
    function refreshPokemonCards() {
        apiCalls.getAllPokemonCards(setPokemonCards);
    }

    // fetch to get pokemonCard sets & save in variable

    function refreshPokemonCardSets() {
        apiCalls.getAllPokemonSets(setPokemonCardSets);
    }

    // takes the event (click) amd runs prevent default, creates an object with the same shape as what API accepts and takes values from edit pokemon card form, uses put method (replaces) and refreshes pokemon cards
    function updateSelectedCard(event) {
        event.preventDefault();

        apiCalls.putSelectedCard(
            pokemonCardData,
            selectedPokemon,
            refreshPokemonCards
        );
    }

    // creates an object that is the same shape as what the API can accept and then passes it into the API POST body. Runs refreshPokemonCards to give us back new data that was updated
    function save(event) {
        event.preventDefault();

        apiCalls.createNewPokemonCard(pokemonCardData, refreshPokemonCards);
    }

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

    // fetch to delete selected card
    function deletePokemon(cardID) {
        apiCalls.deleteSelectedCard(cardID, refreshPokemonCards);
    }
    //fetch to filter pokemon by type, having typeFilter in dependency array updates every time a new filter is added

    const filterPokemon = useCallback(() => {
        apiCalls.getFilteredPokemon(typeFilter, setPokemonCards);
    }, [typeFilter]);

    //
    useEffect(() => {
        if (typeFilter === "") {
            refreshPokemonCards();
        } else filterPokemon();
    }, [typeFilter, filterPokemon]);

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
            <div>
                <div>
                    {pokemonTypes.map((type, i) => (
                        <span key={i}>{type.pokemonType}</span>
                    ))}
                </div>
                <div>
                    {pokemonCardSets.map((set) => (
                        <span key={set.name}>{set.name}</span>
                    ))}
                </div>
            </div>

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
                save={save}
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
                setTypeFilter={setTypeFilter}
                filterPokemon={filterPokemon}
            />

            <Collections
                collectedArray={collectedArray}
                removeFromCollection={removeFromCollection}
            />
        </>
    );
}

export default App;
