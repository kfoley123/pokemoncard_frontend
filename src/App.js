import { useState, useEffect } from "react";

function App() {
    const [pokemonCards, setPokemonCards] = useState([]);
    const refreshPokemonCards = () => {
        fetch("http://localhost:8000/api/pokemoncards")
            .then((response) => response.json())
            .then((response) => {
                setPokemonCards(response);
            });
    };

    useEffect(() => {
        refreshPokemonCards();
    }, []);
    return (
        <div className="App">
            {pokemonCards.map((card, i) => (
                <p key={i}>{card.name}</p>
            ))}
        </div>
    );
}

export default App;
