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
                        {console.log(card)}
                        <th>{card.pokedexIndex}</th>
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
