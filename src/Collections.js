import React from "react";

export default function Collections(props) {
    const { collectedArray, removeFromCollection } = props;
    return (
        <>
            <h1> Collections</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Set</th>
                        <th>Number In Collection</th>
                    </tr>
                </thead>
                <tbody>
                    {collectedArray.map((card, i) => (
                        <tr key={i}>
                            <td>{card.collectedCard.name}</td>
                            <td>{card.collectedCard.pokemonCardSet.name}</td>
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
