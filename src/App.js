import { useState, useEffect, useCallback } from "react";
import EditPokemon from "./EditPokemon/EditPokemon";
import AddPokemon from "./AddPokemon/AddPokemon";
import FilterByType from "./FilterByType/FilterByType";
import Table from "./Table/Table";

function App() {
    const [pokemonCards, setPokemonCards] = useState([]);
    const [pokemonCardSets, setPokemonCardSets] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [typeFilter, setTypeFilter] = useState("");
    const [pokemonTypes, setPokemonTypes] = useState([]);

    const [pokemonCardData, setPokemonCardData] = useState({});

    //because there is nothing in dependency array, runs one time when you load the page
    useEffect(() => {
        refreshPokemonTypes();
        refreshPokemonCards();
        refreshPokemonCardSets();
    }, []);

    //runs a fetch that gets all the pokemon types and sets them into variable. Its a function so we can call it later when needed
    function refreshPokemonTypes() {
        fetch("http://localhost:8000/api/pokemontypes/")
            .then((response) => response.json())
            .then((response) => {
                setPokemonTypes(response);
            });
    }

    //runs a fetch that gets all the pokemoncards and sets them into variable. Its a function so we can call it later when needed
    function refreshPokemonCards() {
        fetch("http://localhost:8000/api/pokemoncards")
            .then((response) => response.json())
            .then((response) => {
                setPokemonCards(response);
            });
    }

    // fetch to get pokemonCard sets & save in variable

    function refreshPokemonCardSets() {
        fetch("http://localhost:8000/api/pokemoncardsets")
            .then((response) => response.json())
            .then((response) => {
                setPokemonCardSets(response);
            });
    }

    // takes the event (click) amd runs prevent default, creates an object with the same shape as what API accepts and takes values from edit pokemon card form, uses put method (replaces) and refreshes pokemon cards
    function updateSelectedCard(event) {
        event.preventDefault();
        console.log(pokemonCardData);

        fetch(`http://localhost:8000/api/pokemoncards/${selectedPokemon.id}/`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pokemonCardData),
        }).then(() => refreshPokemonCards());
    }

    // creates an object that is the same shape as what the API can accept and then passes it into the API POST body. Runs refreshPokemonCards to give us back new data that was updated
    function save(event) {
        event.preventDefault();

        fetch("http://localhost:8000/api/pokemoncards/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pokemonCardData),
        }).then(() => refreshPokemonCards());
    }

    function deletePokemon(cardID) {
        fetch(`http://localhost:8000/api/pokemoncards/${cardID}`, {
            method: "DELETE",
        }).then(() => refreshPokemonCards());
    }

    const filterPokemon = useCallback(() => {
        fetch(
            `http://localhost:8000/api/pokemoncards?pokemontype=${typeFilter}`
        )
            .then((response) => response.json())
            .then((response) => {
                setPokemonCards(response);
            });
    }, [typeFilter]);

    useEffect(() => {
        if (typeFilter === "") {
            refreshPokemonCards();
        } else filterPokemon();
    }, [typeFilter, filterPokemon]);

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
            />

            <AddPokemon
                setPokemonCardData={setPokemonCardData}
                pokemonTypes={pokemonTypes}
                pokemonCardSets={pokemonCardSets}
                save={save}
                updateCardData={updateCardData}
            />

            {Object.keys(selectedPokemon).length !== 0 && (
                <EditPokemon
                    setPokemonCardData={setPokemonCardData}
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
        </>
    );
}

export default App;
