import React from "react";

export default function Filter(props) {
    const { setFilterParams, filterOptions, filterName, filterKey } = props;
    return (
        <>
            <h2>Filter By {filterName}</h2>
            <select
                onChange={(event) =>
                    setFilterParams((prevData) => {
                        return {
                            ...prevData,
                            [filterKey]: event.target.value,
                        };
                    })
                }
                type="text"
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
