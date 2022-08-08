import React from "react";

export default function AddPokemon(props) {
    const { setPokemonCardData, pokemonCardSets, pokemonTypes, save } = props;
    return (
        <form>
            <h2>Add a Pokemon Card</h2>

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
                placeholder="Pokedex Index"
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
                placeholder="Name"
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
                type="text"
                placeholder="Type"
            >
                {pokemonTypes.map((type) => {
                    return <option value={type.id}>{type.pokemonType}</option>;
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
                placeholder="HP"
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
            <button onClick={save}>Submit</button>
        </form>
    );
}
