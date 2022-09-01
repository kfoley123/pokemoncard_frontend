import React from "react";
import Collections from "../Components/Collections/Collections";
import Filter from "../Components/Filter/Filter";

export default function CollectionsPage(props) {
    const {
        setFilterCollectionParams,
        setsSuccess,
        typesSuccess,
        sets,
        collectionSuccess,
        types,
        collections,
    } = props;
    return (
        <>
            <h1> Collection</h1>
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
            {collectionSuccess && <Collections collections={collections} />}
        </>
    );
}
