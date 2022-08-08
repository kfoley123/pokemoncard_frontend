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
            <form>
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
                                type: event.target.value,
                            };
                        })
                    }
                    type="text"
                    defaultValue={selectedPokemon.type}
                ></input>

                <select
                    onChange={(event) =>
                        setPokemonCardData((prevData) => {
                            return {
                                ...prevData,
                                pokemonCardSets: event.target.value,
                            };
                        })
                    }
                >
                    {pokemonCardSets.map((set) => {
                        return <option value={set.id}>{set.name}</option>;
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
            </form>

            <button onClick={updateSelectedCard}>Submit</button>
            <button onClick={() => setSelectedPokemon({})}>Close</button>
        </div>
    );
}
