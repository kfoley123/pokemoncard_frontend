import React, { useState } from "react";
import { useUpdateSelectedCard } from "../../Helpers/apiCalls";
import { validateCard } from "../../Helpers/formValidator";

export default function EditPokemon(props) {
    const {
        types,
        sets,
        setSelectedPokemon,
        cardData,
        updateCardData,
        setPokemonCardData,
    } = props;

    const [validationMessage, setValidationMessage] = useState("");

    const { mutate: updateCard } = useUpdateSelectedCard();

    function formHandler(event) {
        updateCardData(event, setPokemonCardData);
    }

    return (
        <div>
            <form key={cardData.id}>
                <h2>Edit Pokemon Card</h2>
                <span className="error">{validationMessage}</span>

                <input
                    value={cardData.image}
                    name="image"
                    onChange={formHandler}
                    type="text"
                ></input>

                <input
                    value={cardData.pokedexIndex}
                    name="pokedexIndex"
                    onChange={formHandler}
                    type="text"
                ></input>
                <input
                    value={cardData.name}
                    name="name"
                    onChange={formHandler}
                    type="text"
                ></input>

                <select
                    name="type"
                    onChange={formHandler}
                    value={cardData.type.id}
                >
                    {types.map((type) => {
                        return (
                            <option key={type.id} value={type.id}>
                                {type.pokemonType}
                            </option>
                        );
                    })}
                </select>

                <input
                    value={cardData.HP}
                    name="HP"
                    onChange={formHandler}
                    type="text"
                ></input>

                <select
                    name="pokemonCardSet"
                    onChange={formHandler}
                    value={cardData.pokemonCardSet.id}
                >
                    {sets.map((set) => {
                        return (
                            <option key={set.id} value={set.id}>
                                {set.name}
                            </option>
                        );
                    })}
                </select>
            </form>

            <button
                onClick={(event) => {
                    event.preventDefault();

                    let validationResponse = validateCard(cardData);
                    if (validationResponse.valid) {
                        updateCard(cardData);
                        setValidationMessage("");
                    } else setValidationMessage(validationResponse.message);
                }}
            >
                Submit
            </button>
            <button onClick={() => setSelectedPokemon(0)}>Close</button>
        </div>
    );
}
