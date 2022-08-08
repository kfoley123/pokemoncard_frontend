import React from "react";

export default function EditPokemon(props) {
    const {
        setPokemonCardData,
        pokemonTypes,
        pokemonCardSets,
        updateSelectedCard,
        setSelectedPokemon,
        selectedPokemon,
        updateCardData,
    } = props;

    return (
        <div>
            <form key={selectedPokemon.id}>
                <h2>Edit Pokemon Card</h2>
                <input
                    name="pokedexIndex"
                    onChange={updateCardData}
                    type="text"
                    defaultValue={selectedPokemon.pokedexIndex}
                ></input>
                <input
                    name="name"
                    onChange={updateCardData}
                    type="text"
                    defaultValue={selectedPokemon.name}
                ></input>

                <select name="type" onChange={updateCardData}>
                    {pokemonTypes.map((type) => {
                        return (
                            <option value={type.id}>{type.pokemonType}</option>
                        );
                    })}
                </select>

                <input
                    name="HP"
                    onChange={updateCardData}
                    type="text"
                    defaultValue={selectedPokemon.HP}
                ></input>

                <select name="pokemonCardSet" onChange={updateCardData}>
                    {pokemonCardSets.map((set) => {
                        return <option value={set.id}>{set.name}</option>;
                    })}
                </select>
            </form>

            <button onClick={updateSelectedCard}>Submit</button>
            <button onClick={() => setSelectedPokemon({})}>Close</button>
        </div>
    );
}
