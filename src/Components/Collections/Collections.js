import React from "react";
import "./Collections.css";
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
        <div>
            <div className="collectionTable">
                {collections.map((card) => (
                    <div className="card" key={card.id}>
                        <img
                            className="image"
                            src={card.collectedCard.image}
                            alt={card.collectedCard.name}
                        />
                        <div className="collectionsPopUp">
                            <p>
                                #{card.collectedCard.pokedexIndex}-
                                {card.collectedCard.name}
                            </p>
                            <p>{card.collectedCard.pokemonCardSet.name}</p>
                            <p>Quantity: {card.quantity}</p>
                        </div>

                        <div>
                            <button
                                className="deleteButton"
                                onClick={() => removeFromCollection(card)}
                            >
                                Remove fr Collection
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
