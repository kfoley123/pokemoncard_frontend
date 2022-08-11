import React from "react";

export default function Table(props) {
    const {
        pokemonCards,
        setSelectedPokemon,
        setPokemonCardData,
        deletePokemon,
        addToCollection,
    } = props;
    return (
        <>
            <h2>All Cards</h2>
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
                            <td>{card.pokedexIndex}</td>
                            <td>{card.name}</td>
                            <td>{card.type.pokemonType}</td>
                            <td>{card.HP}</td>
                            <td>{card.pokemonCardSet.name}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setSelectedPokemon(card);
                                        setPokemonCardData(() => {
                                            let typeid = card.type.id;
                                            let setid = card.pokemonCardSet.id;
                                            return {
                                                ...card,
                                                type: typeid,
                                                pokemonCardSet: setid,
                                            };
                                        });
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button onClick={() => deletePokemon(card.id)}>
                                    Delete
                                </button>
                                <button
                                    onClick={() => {
                                        addToCollection(card);
                                    }}
                                >
                                    Add To Collection
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
