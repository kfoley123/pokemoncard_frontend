import React from "react";

export default function AddPokemon(props) {
    const { setPokedexIndex, setName, setType, setHP, save } = props;
    return (
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
    );
}
