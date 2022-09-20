import React from "react";
import {
    useDeleteCollection,
    useUpdateSelectedCollection,
} from "../../Helpers/apiCalls";

export default function Collections(props) {
    const { collections, loggedInUser } = props;

    const { mutate: deleteCollection } = useDeleteCollection();

    const { mutate: updateCollections } = useUpdateSelectedCollection();

    function removeFromCollection(card) {
        let numbOfCards = card.quantity;

        if (numbOfCards - 1 <= 0) {
            deleteCollection(card.id);
        } else {
            let collectionObj = {
                id: card.id,
                user: loggedInUser.userID,
                quantity: numbOfCards - 1,
                collectedCard: card.collectedCard.id,
            };

            updateCollections(collectionObj);
        }
    }

    return (
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
                {collections.map((card) => (
                    <tr key={card.id}>
                        <td>{card.collectedCard.name}</td>
                        <td>{card.collectedCard.pokemonCardSet.name}</td>
                        <td>{card.collectedCard.type.pokemonType}</td>
                        <td> {card.quantity} </td>
                        <td>
                            <button onClick={() => removeFromCollection(card)}>
                                Remove fr Collection
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
