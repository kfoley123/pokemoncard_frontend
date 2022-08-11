export function getAllPokemonCards(setPokemonCards) {
    fetch("http://localhost:8000/api/pokemoncards")
        .then((response) => response.json())
        .then((response) => {
            setPokemonCards(response);
        });
}

export function getAllPokemonCollections(setCollectedArray) {
    fetch("http://localhost:8000/api/pokemoncollections/")
        .then((response) => response.json())
        .then((response) => {
            setCollectedArray(response);
        });
}

export function getAllPokemonTypes(setPokemonTypes) {
    fetch("http://localhost:8000/api/pokemontypes/")
        .then((response) => response.json())
        .then((response) => {
            setPokemonTypes(response);
        });
}

export function getAllPokemonSets(setPokemonCardSets) {
    fetch("http://localhost:8000/api/pokemoncardsets")
        .then((response) => response.json())
        .then((response) => {
            setPokemonCardSets(response);
        });
}

export function putSelectedCard(
    pokemonCardData,
    selectedPokemon,
    refreshPokemonCards
) {
    fetch(`http://localhost:8000/api/pokemoncards/${selectedPokemon.id}/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemonCardData),
    }).then(() => refreshPokemonCards());
}

export function createNewPokemonCard(pokemonCardData, refreshPokemonCards) {
    fetch("http://localhost:8000/api/pokemoncards/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemonCardData),
    }).then(() => refreshPokemonCards());
}

export function updateSelectedCollection(
    item,
    collectionObj,
    refreshPokemonCollections
) {
    fetch(`http://localhost:8000/api/pokemoncollections/${item.id}/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionObj),
    }).then(() => refreshPokemonCollections());
}

export function createNewCollection(collectionObj, refreshPokemonCollections) {
    fetch("http://localhost:8000/api/pokemoncollections/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionObj),
    }).then(() => refreshPokemonCollections());
}

export function deleteSelectedCollection(card, refreshPokemonCollections) {
    fetch(`http://localhost:8000/api/pokemoncollections/${card.id}`, {
        method: "DELETE",
    }).then(() => refreshPokemonCollections());
}

export function deleteSelectedCard(cardID, refreshPokemonCards) {
    fetch(`http://localhost:8000/api/pokemoncards/${cardID}`, {
        method: "DELETE",
    }).then(() => refreshPokemonCards());
}

export function getFilteredPokemon(typeFilter, setPokemonCards) {
    fetch(`http://localhost:8000/api/pokemoncards?pokemontype=${typeFilter}`)
        .then((response) => response.json())
        .then((response) => {
            setPokemonCards(response);
        });
}
