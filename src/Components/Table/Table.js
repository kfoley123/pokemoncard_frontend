import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import "./Table.css";
import {
    createNewCollection,
    updateSelectedCollection,
    deleteSelectedCard,
} from "../../Helpers/apiCalls";

export default function Table(props) {
    const {
        pokemonCards,
        setSelectedPokemon,
        setPokemonCardData,
        collections,
    } = props;

    const queryClient = useQueryClient();

    const { mutate: createCollection } = useMutation(createNewCollection, {
        onSuccess: () => {
            queryClient.invalidateQueries(["allCollections"]);
        },
    });

    const { mutate: updateCollection } = useMutation(updateSelectedCollection, {
        onSuccess: () => {
            queryClient.invalidateQueries(["allCollections"]);
        },
    });

    const { mutate: deleteCard } = useMutation(deleteSelectedCard, {
        onSuccess: () => {
            queryClient.invalidateQueries(["allPokemonCards"]);
        },
    });

    function addToCollection(card) {
        let cardMatch = false;
        collections.forEach((item) => {
            if (item.collectedCard.id === card.id) {
                let collectionObj = {
                    ...item,
                    quantity: item.quantity + 1,
                    collectedCard: item.collectedCard.id,
                };
                updateCollection(collectionObj);
                cardMatch = true;
                return;
            }
        });
        if (!cardMatch) {
            let collectionObj = {
                user: "User1",
                quantity: "1",
                collectedCard: card.id,
            };
            createCollection(collectionObj);
        }
    }

    return (
        <>
            <h2>All Cards</h2>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
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
                            <td>
                                <img
                                    className="image"
                                    src={card.image}
                                    alt={card.name}
                                />
                            </td>
                            <td>{card.pokedexIndex}</td>
                            <td>{card.name}</td>
                            <td>{card.type.pokemonType}</td>
                            <td>{card.HP}</td>
                            <td>{card.pokemonCardSet.name}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setSelectedPokemon(card.id);
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
                                <button onClick={() => deleteCard(card.id)}>
                                    Delete
                                </button>
                                <button onClick={() => addToCollection(card)}>
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
