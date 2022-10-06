import React, { useState } from "react";
import Filter from "../Components/Filter/Filter";
import AllCards from "../Components/AllCards/AllCards";
import AddPokemon from "../Components/AddPokemon/AddPokemon";
import { useAllPokemonCards } from "../Helpers/apiCalls";

export default function Home(props) {
    const {
        sets,
        setsSuccess,
        typesSuccess,
        types,
        collections,
        updateFormData,
        loggedInUser,
    } = props;

    const [filterParams, setFilterParams] = useState({
        pokemonset: "",
        pokemontype: "",
    });

    const { data: cards, isSuccess: cardsSuccess } =
        useAllPokemonCards(filterParams);

    return (
        <>
            <h2> All Cards </h2>
            <div className="filters">
                {setsSuccess && (
                    <Filter
                        setFilterParams={setFilterParams}
                        filterOptions={sets}
                        filterName="Set"
                        filterKey="pokemonset"
                    />
                )}

                {typesSuccess && (
                    <Filter
                        setFilterParams={setFilterParams}
                        filterOptions={types}
                        filterName="Type"
                        filterKey="pokemontype"
                    />
                )}
            </div>
            {cardsSuccess && (
                <AllCards
                    pokemonCards={cards}
                    collections={collections}
                    loggedInUser={loggedInUser}
                />
            )}
            {loggedInUser.username === "kortney" &&
                setsSuccess &&
                typesSuccess && (
                    <AddPokemon
                        types={types}
                        sets={sets}
                        updateCardData={updateFormData}
                    />
                )}
        </>
    );
}
