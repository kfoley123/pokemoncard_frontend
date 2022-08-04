import React from "react";

export default function Table(props) {
    const {
        pokemonCards,
        setSelectedPokemon,
        setPokedexIndex,
        setName,
        setType,
        setHP,
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
                </tr>
            </thead>
            <tbody>
                {pokemonCards.map((card, i) => (
                    <tr key={i}>
                        <th>{card.pokedexIndex}</th>
                        <td>{card.name}</td>
                        <td>{card.pokemonType}</td>
                        <td>{card.HP}</td>
                        <td>
                            <button
                                onClick={() => {
                                    setSelectedPokemon(card);
                                    setPokedexIndex(card.pokedexIndex);
                                    setName(card.name);
                                    setType(card.pokemonType);
                                    setHP(card.HP);
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
