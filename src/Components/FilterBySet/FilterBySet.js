import React from "react";

export default function FilterBySet(props) {
    const { setFilterParams, pokemonCardSets } = props;
    return (
        <form>
            <h2>Filter By Set</h2>
            <select
                onChange={(event) =>
                    setFilterParams((prevData) => {
                        return {
                            ...prevData,
                            pokemonset: event.target.value,
                        };
                    })
                }
                type="text"
                placeholder="Set"
            >
                <option value="" disabled>
                    Select A Set
                </option>
                <option value="">View All</option>

                {pokemonCardSets.map((set) => {
                    return (
                        <option key={set.id} value={set.id}>
                            {set.name}
                        </option>
                    );
                })}
            </select>
        </form>
    );
}