import React from "react";

export default function EditPokemon(props) {
    const {
        setPokemonCardData,
        pokemonTypes,
        pokemonCardSets,
        updateSelectedCard,
        setSelectedPokemon,
        selectedPokemon,
    } = props;
    return (
        <div>
            <form key={selectedPokemon.id}>
                <h2>Edit Pokemon Card</h2>
                <input
                    onChange={(event) =>
                        setPokemonCardData((prevData) => {
                            return {
                                ...prevData,
                                pokedexIndex: event.target.value,
                            };
                        })
                    }
                    type="text"
                    defaultValue={selectedPokemon.pokedexIndex}
                ></input>
                <input
                    onChange={(event) =>
                        setPokemonCardData((prevData) => {
                            return {
                                ...prevData,
                                name: event.target.value,
                            };
                        })
                    }
                    type="text"
                    defaultValue={selectedPokemon.name}
                ></input>

                <select
                    onChange={(event) =>
                        setPokemonCardData((prevData) => {
                            return {
                                ...prevData,
                                type: event.target.value,
                            };
                        })
                    }
                >
                    {pokemonTypes.map((type) => {
                        return (
                            <option value={type.id}>{type.pokemonType}</option>
                        );
                    })}
                </select>

                <input
                    onChange={(event) =>
                        setPokemonCardData((prevData) => {
                            return {
                                ...prevData,
                                HP: event.target.value,
                            };
                        })
                    }
                    type="text"
                    defaultValue={selectedPokemon.HP}
                ></input>

                <select
                    onChange={(event) =>
                        setPokemonCardData((prevData) => {
                            return {
                                ...prevData,
                                pokemonCardSet: event.target.value,
                            };
                        })
                    }
                >
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
