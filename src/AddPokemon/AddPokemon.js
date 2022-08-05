import React from "react";

export default function AddPokemon(props) {
    const { setPokemonCardData, save } = props;
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

            <input
                onChange={(event) =>
                    setPokemonCardData((prevData) => {
                        return {
                            ...prevData,
                            pokemonType: event.target.value,
                        };
                    })
                }
                type="text"
                placeholder="Type"
            ></input>
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
            <button onClick={save}>Submit</button>
        </form>
    );
}
