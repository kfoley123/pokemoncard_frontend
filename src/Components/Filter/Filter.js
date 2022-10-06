import React from "react";

export default function Filter(props) {
    const { setFilterParams, filterOptions, filterName, filterKey } = props;
    return (
        <>
            <h3>Filter By {filterName}</h3>
            <select
                onChange={(event) =>
                    setFilterParams((prevData) => {
                        return {
                            ...prevData,
                            [filterKey]: event.target.value,
                        };
                    })
                }
            >
                <option value="" disabled>
                    Select A {filterName}
                </option>
                <option value="">View All</option>

                {filterOptions.map((option) => {
                    return (
                        <option key={option.id} value={option.id}>
                            {option.name || option.pokemonType}
                        </option>
                    );
                })}
            </select>
        </>
    );
}
