import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
    deleteSelectedCollection,
    useUpdateSelectedCollection,
} from "../../Helpers/apiCalls";
import Filter from "../Filter/Filter";

export default function Collections(props) {
    const { collections, sets, types, setFilterCollectionParams } = props;

    const queryClient = useQueryClient();

    const { mutate: deleteCollection } = useMutation(deleteSelectedCollection, {
        onSuccess: () => {
            queryClient.invalidateQueries(["allCollections"]);
        },
    });

    const { mutate: updateCollections } = useUpdateSelectedCollection();

    function removeFromCollection(card) {
        let numbOfCards = card.quantity;

        if (numbOfCards - 1 <= 0) {
            deleteCollection(card.id);
        } else {
            let collectionObj = {
                id: card.id,
                user: "User1",
                quantity: numbOfCards - 1,
                collectedCard: card.collectedCard.id,
            };

            updateCollections(collectionObj);
        }
    }

    return (
        <>
            <h1> Collection</h1>

            <Filter
                setFilterParams={setFilterCollectionParams}
                filterOptions={sets}
                filterName="Set"
                filterKey="pokemonset"
            />

            <Filter
                setFilterParams={setFilterCollectionParams}
                filterOptions={types}
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
                    {collections.map((card, i) => (
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
