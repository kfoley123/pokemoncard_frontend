import { useState, useEffect } from "react";

function App() {
    const [pokemonCards, setPokemonCards] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [HP, setHP] = useState("");
    const [ID, setID] = useState("");

    //because there is nothing in dependency array, runs one time when you load the page
    useEffect(() => {
        refreshPokemonCards();
    }, []);

    //runs a fetch that gets all the pokemon and sets them into variable. Its a function so we can call it later when needed
    const refreshPokemonCards = () => {
        fetch("http://localhost:8000/api/pokemoncards")
            .then((response) => response.json())
            .then((response) => {
                setPokemonCards(response);
            });
    };

    // creates an object that is the same shape as what the API can accept and then passes it into the API POST body. Runs refreshPokemonCards to give us back new data that was updated
    function save(event) {
        event.preventDefault();

        let pokemonCard = {
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

    function deletePokemon(event) {
        event.preventDefault();

        fetch(`http://localhost:8000/api/pokemoncards/${ID}`, {
            method: "DELETE",
        }).then(() => refreshPokemonCards());
    }

    return (
        <div className="App">
            {pokemonCards.map((card, i) => (
                <p key={i}>{card.name}</p>
            ))}
            <form>
                <h2>Add a Pokemon Card</h2>
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

            <form>
                <h2>Delete a Pokemon Card</h2>
                <input
                    onChange={(event) => setID(event.target.value)}
                    type="text"
                    placeholder="ID"
                ></input>
                <button onClick={deletePokemon}>Delete</button>
            </form>
        </div>
    );
}

export default App;
