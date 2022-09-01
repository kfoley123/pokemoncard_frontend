import React, { useState } from "react";
import CreateUser from "../Components/CreateUser/CreateUser";
import Filter from "../Components/Filter/Filter";
import Table from "../Components/Table/Table";
import AddPokemon from "../Components/AddPokemon/AddPokemon";
import EditPokemon from "../Components/EditPokemon/EditPokemon";
import { useAllPokemonCards } from "../Helpers/apiCalls";

export default function Home(props) {
    const { sets, setsSuccess, typesSuccess, types, collections } = props;

    const [filterParams, setFilterParams] = useState({
        pokemonset: "",
        pokemontype: "",
    });

    const { data: cards, isSuccess: cardsSuccess } =
        useAllPokemonCards(filterParams);

    const [selectedPokemon, setSelectedPokemon] = useState(0);
    const [pokemonCardData, setPokemonCardData] = useState({});

    function updateFormData(event, setterFunction) {
        setterFunction((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value,
            };
        });
    }

    return (
        <>
            <CreateUser updateUserData={updateFormData} />
            <h1> Pokemon Card Collection App </h1>
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
                <Table
                    setSelectedPokemon={setSelectedPokemon}
                    pokemonCards={cards}
                    setPokemonCardData={setPokemonCardData}
                    collections={collections}
                />
            )}
            {setsSuccess && typesSuccess && (
                <AddPokemon
                    types={types}
                    sets={sets}
                    updateCardData={updateFormData}
                />
            )}
            {selectedPokemon !== 0 && setsSuccess && typesSuccess && (
                <EditPokemon
                    sets={sets}
                    setSelectedPokemon={setSelectedPokemon}
                    selectedPokemon={selectedPokemon}
                    types={types}
                    updateCardData={updateFormData}
                    cardData={pokemonCardData}
                    setPokemonCardData={setPokemonCardData}
                />
            )}
        </>
    );
}
