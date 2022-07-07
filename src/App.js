import { useState, useEffect } from "react";

function App() {
    const [pokemonCards, setPokemonCards] = useState([]);
    const [pokedexIndex, setPokedexIndex] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [HP, setHP] = useState("");
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [typeFilter, setTypeFilter] = useState("");

    //because there is nothing in dependency array, runs one time when you load the page
    useEffect(() => {
        refreshPokemonCards();
    }, []);

    //runs a fetch that gets all the pokemon and sets them into variable. Its a function so we can call it later when needed
    function refreshPokemonCards() {
        fetch("http://localhost:8000/api/pokemoncards")
            .then((response) => response.json())
            .then((response) => {
                setPokemonCards(response);
            });
    }

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
        <div className="App">
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Pokedex Index</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>HP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemonCards.map((card, i) => (
                            <tr key={i}>
                                <th>{card.pokedexIndex}</th>
                                <td>{card.name}</td>
                                <td>{card.pokemonType}</td>
                                <td>{card.HP}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setSelectedPokemon(card);
                                            setPokedexIndex(card.pokedexIndex);
                                            setName(card.name);
                                            setType(card.pokemonType);
                                            setHP(card.HP);
                                        }}
                                    >
                                        edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => deletePokemon(card.id)}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedPokemon.name}
            </div>

            <form>
                <h2>Add a Pokemon Card</h2>

                <input
                    onChange={(event) => setPokedexIndex(event.target.value)}
                    type="text"
                    placeholder="Pokedex Index"
                ></input>
                <input
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    placeholder="Name"
                ></input>

                <input
                    onChange={(event) => setType(event.target.value)}
                    type="text"
                    placeholder="Type"
                ></input>
                <input
                    onChange={(event) => setHP(event.target.value)}
                    type="text"
                    placeholder="HP"
                ></input>
                <button onClick={save}>Submit</button>
            </form>

            {Object.keys(selectedPokemon).length !== 0 && (
                <div>
                    <form>
                        <h2>Edit Pokemon Card</h2>
                        <input
                            onChange={(event) =>
                                setPokedexIndex(event.target.value)
                            }
                            type="text"
                            defaultValue={selectedPokemon.pokedexIndex}
                        ></input>
                        <input
                            onChange={(event) => setName(event.target.value)}
                            type="text"
                            defaultValue={selectedPokemon.name}
                        ></input>
                        <input
                            onChange={(event) => setType(event.target.value)}
                            type="text"
                            defaultValue={selectedPokemon.pokemonType}
                        ></input>
                        <input
                            onChange={(event) => setHP(event.target.value)}
                            type="text"
                            defaultValue={selectedPokemon.HP}
                        ></input>
                    </form>
                    {pokedexIndex}
                    {name}
                    {type}
                    {HP}

                    <button onClick={updateSelectedCard}>Submit</button>
                    <button onClick={() => setSelectedPokemon({})}>
                        Close
                    </button>
                </div>
            )}

            <form>
                <h2>Filter By Type</h2>
                <select
                    onChange={(event) => setTypeFilter(event.target.value)}
                    type="text"
                    placeholder="Type"
                >
                    <option value="" disabled>
                        Select A Type
                    </option>
                    <option value="Fire">Fire</option>
                    <option value="Water">Water</option>
                    <option value="Grass">Grass</option>
                </select>
                <button onClick={filterPokemon}>Filter</button>
            </form>
        </div>
    );
}

export default App;
