import React from "react";

export default function EditPokemon(props) {
    const {
        types,
        sets,
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
                    defaultValue={selectedPokemon.image}
                    name="image"
                    onChange={updateCardData}
                    type="text"
                ></input>

                <input
                    defaultValue={selectedPokemon.pokedexIndex}
                    name="pokedexIndex"
                    onChange={updateCardData}
                    type="text"
                ></input>
                <input
                    defaultValue={selectedPokemon.name}
                    name="name"
                    onChange={updateCardData}
                    type="text"
                ></input>

                <select
                    name="type"
                    onChange={updateCardData}
                    value={selectedPokemon.type.id}
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
                    defaultValue={selectedPokemon.HP}
                    name="HP"
                    onChange={updateCardData}
                    type="text"
                ></input>

                <select
                    name="pokemonCardSet"
                    onChange={updateCardData}
                    value={selectedPokemon.pokemonCardSet.id}
                >
                    {sets.map((set) => {
                        return (
                            <option key={set.id} value={set.id}>
                                {set.name}
                            </option>
                        );
                    })}
                </select>
            </form>

            <button
                onClick={(event) => {
                    event.preventDefault();
                    updateSelectedCard();
                }}
            >
                Submit
            </button>
            <button onClick={() => setSelectedPokemon({})}>Close</button>
        </div>
    );
}
