import React from "react";

export default function FilterByType(props) {
    const { setFilterParams, pokemonTypes } = props;
    return (
        <form>
            <h2>Filter By Type</h2>
            <select
                onChange={(event) =>
                    setFilterParams((prevData) => {
                        return {
                            ...prevData,
                            pokemontype: event.target.value,
                        };
                    })
                }
                type="text"
                placeholder="Type"
            >
                <option value="" disabled>
                    Select A Type
                </option>
                <option value="">View All</option>

                {pokemonTypes.map((type) => {
                    return (
                        <option key={type.id} value={type.id}>
                            {type.pokemonType}
                        </option>
                    );
                })}
            </select>
        </form>
    );
}
