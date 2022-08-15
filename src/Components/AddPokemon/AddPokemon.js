import React from "react";

export default function AddPokemon(props) {
    const { sets, types, saveNewPokemon, updateCardData } = props;

    return (
        <form>
            <h2>Add a Pokemon Card</h2>

            <input
                name="image"
                onChange={updateCardData}
                type="text"
                placeholder="Image"
            ></input>

            <input
                name="pokedexIndex"
                onChange={updateCardData}
                type="text"
                placeholder="Pokedex Index"
            ></input>

            <input
                name="name"
                onChange={updateCardData}
                type="text"
                placeholder="Name"
            ></input>

            <select
                name="type"
                onChange={updateCardData}
                type="text"
                placeholder="Type"
            >
                {types.map((type) => {
                    return (
                        <option key={type.id} value={type.id}>
                            {type.pokemonType}
                        </option>
                    );
                })}
            </select>
            <input
                name="HP"
                onChange={updateCardData}
                type="text"
                placeholder="HP"
            ></input>
            <select name="pokemonCardSet" onChange={updateCardData}>
                {sets.map((set) => {
                    return (
                        <option key={set.id} value={set.id}>
                            {set.name}
                        </option>
                    );
                })}
            </select>
            <button
                onClick={(event) => {
                    event.preventDefault();
                    saveNewPokemon();
                }}
            >
                Submit
            </button>
        </form>
    );
}
