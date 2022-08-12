import React from "react";
import Filter from "../Filter/Filter";

export default function Collections(props) {
    const {
        collectedArray,
        removeFromCollection,
        pokemonCardSets,
        pokemonTypes,
        setFilterCollectionParams,
    } = props;
    return (
        <>
            <h1> Collection</h1>
            <Filter
                setFilterParams={setFilterCollectionParams}
                filterOptions={pokemonCardSets}
                filterName="Set"
                filterKey="pokemonset"
            />

            <Filter
                setFilterParams={setFilterCollectionParams}
                filterOptions={pokemonTypes}
                filterName="Type"
                filterKey="pokemontype"
            />

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Set</th>
                        <th>Type</th>
                        <th>Number In Collection</th>
                    </tr>
                </thead>
                <tbody>
                    {collectedArray.map((card, i) => (
                        <tr key={i}>
                            <td>{card.collectedCard.name}</td>
                            <td>{card.collectedCard.pokemonCardSet.name}</td>
                            <td>{card.collectedCard.type.pokemonType}</td>
                            <td> {card.quantity} </td>
                            <td>
                                <button
                                    onClick={() => removeFromCollection(card)}
                                >
                                    Remove fr Collection
                                </button>
                            </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
