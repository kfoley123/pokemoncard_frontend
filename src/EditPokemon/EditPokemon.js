import React from "react";

export default function EditPokemon(props) {
    const {
        setPokemonCardData,
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
                    defaultValue={selectedPokemon.pokemonType}
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
                    defaultValue={selectedPokemon.HP}
                ></input>
            </form>

            <button onClick={updateSelectedCard}>Submit</button>
            <button onClick={() => setSelectedPokemon({})}>Close</button>
        </div>
    );
}
