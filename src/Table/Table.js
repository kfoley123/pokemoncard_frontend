import React from "react";

export default function Table(props) {
    const {
        pokemonCards,
        setSelectedPokemon,
        setPokemonCardData,
        deletePokemon,
    } = props;
    return (
        <table>
            <thead>
                <tr>
                    <th>Pokedex Index</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>HP</th>
                    <th>Set</th>
                </tr>
            </thead>
            <tbody>
                {pokemonCards.map((card, i) => (
                    <tr key={i}>
                        <th>{card.pokedexIndex}</th>
                        <td>{card.name}</td>
                        <td>{card.type}</td>
                        <td>{card.HP}</td>
                        <td>{card.pokemonCardSet.name}</td>
                        <td>
                            <button
                                onClick={() => {
                                    setSelectedPokemon(card);
                                    setPokemonCardData(card);
                                }}
                            >
                                edit
                            </button>
                        </td>
                        <td>
                            <button onClick={() => deletePokemon(card.id)}>
                                delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
