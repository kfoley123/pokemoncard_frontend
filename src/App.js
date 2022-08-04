import { useState, useEffect } from "react";
import AddPokemon from "./AddPokemon /AddPokemon";
import EditPokemon from "./EditPokemon/EditPokemon";
import FilterByType from "./FilterByType/FilterByType";
import Table from "./Table/Table";

function App() {
    const [pokemonCards, setPokemonCards] = useState([]);
    const [pokedexIndex, setPokedexIndex] = useState("");
    const [pokemonCardSets, setPokemonCardSets] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [HP, setHP] = useState("");
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [typeFilter, setTypeFilter] = useState("");
    const [pokemonTypes, setPokemonTypes] = useState([]);

    //because there is nothing in dependency array, runs one time when you load the page
    useEffect(() => {
        refreshPokemonCards();
        refreshPokemonTypes();
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

        let pokemonCard = {
            pokedexIndex: pokedexIndex,
            name: name,
            pokemonType: type,
            HP: HP,
        };

        fetch(`http://localhost:8000/api/pokemoncards/${selectedPokemon.id}/`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pokemonCard),
        }).then(() => refreshPokemonCards());
    }

    // creates an object that is the same shape as what the API can accept and then passes it into the API POST body. Runs refreshPokemonCards to give us back new data that was updated
    function save(event) {
        event.preventDefault();

        let pokemonCard = {
            pokedexIndex: pokedexIndex,
            name: name,
            pokemonType: type,
            HP: HP,
        };

        fetch("http://localhost:8000/api/pokemoncards/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pokemonCard),
        }).then(() => refreshPokemonCards());
    }

    function deletePokemon(cardID) {
        fetch(`http://localhost:8000/api/pokemoncards/${cardID}`, {
            method: "DELETE",
        }).then(() => refreshPokemonCards());
    }

    function filterPokemon(event) {
        event.preventDefault();

        fetch(
            `http://localhost:8000/api/pokemoncards?pokemontype=${typeFilter}`
        )
            .then((response) => response.json())
            .then((response) => {
                setPokemonCards(response);
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
                setPokedexIndex={setPokedexIndex}
                setName={setName}
                setType={setType}
                setHP={setHP}
                deletePokemon={deletePokemon}
            />

            <AddPokemon
                setPokedexIndex={setPokedexIndex}
                setName={setName}
                setType={setType}
                setHP={setHP}
                save={save}
            />

            {Object.keys(selectedPokemon).length !== 0 && (
                <EditPokemon
                    setPokedexIndex={setPokedexIndex}
                    setName={setName}
                    setType={setType}
                    setHP={setHP}
                    updateSelectedCard={updateSelectedCard}
                    setSelectedPokemon={setSelectedPokemon}
                    selectedPokemon={selectedPokemon}
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
