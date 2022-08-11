import API from "./api";

export function getAllPokemonCards(setPokemonCards) {
    API.get("pokemoncards/").then((response) => setPokemonCards(response.data));
}

export function getAllPokemonCollections(setCollectedArray) {
    API.get("pokemoncollections/").then((response) =>
        setCollectedArray(response.data)
    );
}

export function getAllPokemonTypes(setPokemonTypes) {
    API.get("pokemontypes/").then((response) => setPokemonTypes(response.data));
}

export function getAllPokemonSets(setPokemonCardSets) {
    API.get("pokemoncardsets/").then((response) =>
        setPokemonCardSets(response.data)
    );
}

export function putSelectedCard(
    pokemonCardData,
    selectedPokemon,
    refreshPokemonCards
) {
    API.put(`pokemoncards/${selectedPokemon.id}/`, pokemonCardData).then(() =>
        refreshPokemonCards()
    );
}

export function createNewPokemonCard(pokemonCardData, refreshPokemonCards) {
    API.post("pokemoncards/", pokemonCardData).then(() =>
        refreshPokemonCards()
    );
}

export function updateSelectedCollection(
    item,
    collectionObj,
    refreshPokemonCollections
) {
    API.put(`pokemoncollections/${item.id}/`, collectionObj).then(() =>
        refreshPokemonCollections()
    );
}

export function createNewCollection(collectionObj, refreshPokemonCollections) {
    API.post("pokemoncollections/", collectionObj).then(() =>
        refreshPokemonCollections()
    );
}

export function deleteSelectedCollection(card, refreshPokemonCollections) {
    API.delete(`pokemoncollections/${card.id}`).then(() =>
        refreshPokemonCollections()
    );
}

export function deleteSelectedCard(cardID, refreshPokemonCards) {
    API.delete(`pokemoncards/${cardID}`).then(() => refreshPokemonCards());
}

export function getFilteredType(typeFilter, setPokemonCards) {
    API.get(`pokemoncards?pokemontype=${typeFilter}`).then((response) =>
        setPokemonCards(response.data)
    );
}

export function getFilteredSet(setFilter, setPokemonCards) {
    API.get(`pokemoncards?pokemonset=${setFilter}`).then((response) =>
        setPokemonCards(response.data)
    );
}
