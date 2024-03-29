import React, { useEffect } from "react";
import Collections from "../Components/Collections/Collections";
import Filter from "../Components/Filter/Filter";

export default function CollectionsPage(props) {
    const {
        setsSuccess,
        typesSuccess,
        sets,
        types,
        collectionSuccess,
        collections,
        setFilterCollectionParams,
        loggedInUser,
    } = props;

    useEffect(() => {
        setFilterCollectionParams((prevData) => {
            return { ...prevData, pokemonset: "", pokemontype: "" };
        });
    }, [setFilterCollectionParams]);

    return (
        <>
            <h2>Collection</h2>

            <div className="filters">
                {setsSuccess && (
                    <Filter
                        setFilterParams={setFilterCollectionParams}
                        filterOptions={sets}
                        filterName="Set"
                        filterKey="pokemonset"
                    />
                )}
                {typesSuccess && (
                    <Filter
                        setFilterParams={setFilterCollectionParams}
                        filterOptions={types}
                        filterName="Type"
                        filterKey="pokemontype"
                    />
                )}
            </div>
            {collectionSuccess && (
                <Collections
                    collections={collections}
                    loggedInUser={loggedInUser}
                />
            )}
        </>
    );
}
