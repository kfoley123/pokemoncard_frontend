import React from "react";

export default function AddPokemon(props) {
    const {
        setPokemonCardData,
        pokemonCardSets,
        pokemonTypes,
        save,
        updateCardData,
    } = props;

    return (
        <form>
            <h2>Add a Pokemon Card</h2>

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
                {pokemonTypes.map((type) => {
                    return <option value={type.id}>{type.pokemonType}</option>;
                })}
            </select>
            <input
                name="HP"
                onChange={updateCardData}
                type="text"
                placeholder="HP"
            ></input>
            <select name="pokemonCardSet" onChange={updateCardData}>
                {pokemonCardSets.map((set) => {
                    return <option value={set.id}>{set.name}</option>;
                })}
            </select>
            <button onClick={save}>Submit</button>
        </form>
    );
}
