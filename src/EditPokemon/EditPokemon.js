import React from "react";

export default function EditPokemon(props) {
    const {
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

                <select
                    value={selectedPokemon.type.id}
                    name="type"
                    onChange={updateCardData}
                >
                    {pokemonTypes.map((type) => {
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
                    defaultValue={selectedPokemon.HP}
                ></input>

                <select
                    value={selectedPokemon.pokemonCardSet.id}
                    name="pokemonCardSet"
                    onChange={updateCardData}
                >
                    {pokemonCardSets.map((set) => {
                        return (
                            <option key={set.id} value={set.id}>
                                {set.name}
                            </option>
                        );
                    })}
                </select>
            </form>

            <button onClick={updateSelectedCard}>Submit</button>
            <button onClick={() => setSelectedPokemon({})}>Close</button>
        </div>
    );
}
