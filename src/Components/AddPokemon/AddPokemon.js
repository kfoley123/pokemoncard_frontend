import React, { useState } from "react";
import { useCreateCard } from "../../Helpers/apiCalls";
import "./AddPokemon.css";
import { validateCard } from "../../Helpers/formValidator";

export default function AddPokemon(props) {
    const { sets, types } = props;

    const newCardDataDefault = {
        image: "",
        pokedexIndex: "",
        name: "",
        type: 0,
        HP: "",
        pokemonCardSet: 0,
    };

    const [newCardData, setNewCardData] = useState(newCardDataDefault);

    const [validationMessage, setValidationMessage] = useState("");

    function updateCardData(event) {
        setNewCardData((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value,
            };
        });
    }

    const { mutate: createCard } = useCreateCard();

    return (
        <form>
            <h2>Add a Pokemon Card</h2>
            <span className="error">{validationMessage}</span>

            <input
                name="image"
                onChange={updateCardData}
                type="text"
                placeholder="Image"
                value={newCardData.image}
            ></input>

            <input
                name="pokedexIndex"
                onChange={updateCardData}
                type="text"
                placeholder="Pokedex Index"
                value={newCardData.pokedexIndex}
            ></input>

            <input
                name="name"
                onChange={updateCardData}
                type="text"
                placeholder="Name"
                value={newCardData.name}
            ></input>

            <select
                name="type"
                value={newCardData.type}
                onChange={updateCardData}
            >
                <option value="0">Type</option>
                {types.map((type) => {
                    return (
                        <option key={type.id} value={type.id}>
                            {type.pokemonType}
                        </option>
                    );
                })}
            </select>
            <input
                name="HP"
                onChange={updateCardData}
                type="text"
                placeholder="HP"
                value={newCardData.HP}
            ></input>
            <select
                name="pokemonCardSet"
                value={newCardData.pokemonCardSet}
                onChange={updateCardData}
            >
                <option value="0">Set</option>
                {sets.map((set) => {
                    return (
                        <option key={set.id} value={set.id}>
                            {set.name}
                        </option>
                    );
                })}
            </select>
            <button
                onClick={(event) => {
                    event.preventDefault();
                    let validationResponse = validateCard(newCardData);
                    if (validationResponse.valid) {
                        console.log("hello");
                        createCard(newCardData);
                        setNewCardData(newCardDataDefault);
                        setValidationMessage("");
                    } else setValidationMessage(validationResponse.message);
                }}
            >
                Submit
            </button>
        </form>
    );
}
