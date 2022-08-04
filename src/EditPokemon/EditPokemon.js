import React from "react";

export default function EditPokemon(props) {
    const {
        setPokedexIndex,
        setName,
        setType,
        setHP,
        updateSelectedCard,
        setSelectedPokemon,
        selectedPokemon,
    } = props;
    return (
        <div>
            <form>
                <h2>Edit Pokemon Card</h2>
                <input
                    onChange={(event) => setPokedexIndex(event.target.value)}
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

            <button onClick={updateSelectedCard}>Submit</button>
            <button onClick={() => setSelectedPokemon({})}>Close</button>
        </div>
    );
}
