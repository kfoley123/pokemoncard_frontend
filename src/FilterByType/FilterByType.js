import React from "react";

export default function FilterByType(props) {
    const { setTypeFilter } = props;
    return (
        <form>
            <h2>Filter By Type</h2>
            <select
                onChange={(event) => setTypeFilter(event.target.value)}
                type="text"
                placeholder="Type"
            >
                <option value="" disabled>
                    Select A Type
                </option>
                <option value="">View All</option>
                <option value="Fire">Fire</option>
                <option value="Water">Water</option>
                <option value="Grass">Grass</option>
            </select>
        </form>
    );
}
