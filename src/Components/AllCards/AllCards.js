import React from "react";
import "./AllCards.css";
import {
    useCreateCollection,
    useUpdateSelectedCollection,
} from "../../Helpers/apiCalls";

export default function AllCards(props) {
    const { pokemonCards, collections, loggedInUser } = props;

    const { mutate: createCollection } = useCreateCollection();

    const { mutate: updateCollection } = useUpdateSelectedCollection();

    function addToCollection(card) {
        let cardMatch = false;
        collections.forEach((item) => {
            if (item.collectedCard.id === card.id) {
                let collectionObj = {
                    ...item,
                    quantity: item.quantity + 1,
                    user: item.user.id,
                    collectedCard: item.collectedCard.id,
                };
                updateCollection(collectionObj);
                cardMatch = true;
                return;
            }
        });
        if (!cardMatch) {
            let collectionObj = {
                user: loggedInUser.userID,
                quantity: "1",
                collectedCard: card.id,
            };
            createCollection(collectionObj);
        }
    }

    return (
        <div className="cardTable">
            {pokemonCards.map((card) => (
                <div className="card" key={card.id}>
                    <img className="image" src={card.image} alt={card.name} />
                    <div className="cardPopUp">
                        <div className="cardPopUpElement">
                            <div className="indexName">
                                #{card.pokedexIndex}-{card.name}
                            </div>
                            {card.pokemonCardSet.name}
                        </div>
                    </div>

                    <div>
                        {loggedInUser.userID > 0 && (
                            <button
                                className="addButton"
                                onClick={() => addToCollection(card)}
                            >
                                Add to Collection
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
