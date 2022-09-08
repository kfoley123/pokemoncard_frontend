import React, { useState } from "react";
import CreateUser from "../Components/CreateUser/CreateUser";
import Filter from "../Components/Filter/Filter";
import Table from "../Components/Table/Table";
import AddPokemon from "../Components/AddPokemon/AddPokemon";
import EditPokemon from "../Components/EditPokemon/EditPokemon";
import { useAllPokemonCards, useAllUsers } from "../Helpers/apiCalls";
import LogIn from "../Components/LogIn/LogIn";

export default function Home(props) {
    const { sets, setsSuccess, typesSuccess, types, collections } = props;

    const [filterParams, setFilterParams] = useState({
        pokemonset: "",
        pokemontype: "",
    });

    const { data: cards, isSuccess: cardsSuccess } =
        useAllPokemonCards(filterParams);

    const { data: users } = useAllUsers();

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
            <LogIn updateLogInRequest={updateFormData} users={users} />
            <CreateUser updateUserData={updateFormData} users={users} />
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
