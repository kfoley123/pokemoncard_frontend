import React from "react";

export default function Collections(props) {
    const { pokemonCards, collectedArray } = props;

    function duplicateCount(collectedCard) {
        let cardCount = 0;
        collectedArray.forEach((card) => {
            if (card === collectedCard) {
                cardCount++;
            }
        });
        return cardCount;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Pokedex Index</th>
                    <th>Set</th>
                    <th>Number In Collection</th>
                </tr>
            </thead>
            <tbody>
                {collectedArray.map((card, i) => (
                    <tr key={i}>
                        <td>{card.name}</td>
                        <td>{card.pokemonCardSet.name}</td>
                        <td> {duplicateCount(card)} </td>
                        <td>
                            <button>Remove fr Collection</button>
                        </td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
