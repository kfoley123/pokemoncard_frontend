import axios from "axios";

export function getAllPokemonCards(setPokemonCards) {
    axios
        .get("http://localhost:8000/api/pokemoncards")
        .then((response) => setPokemonCards(response.data));
}

export function getAllPokemonCollections(setCollectedArray) {
    axios
        .get("http://localhost:8000/api/pokemoncollections/")
        .then((response) => setCollectedArray(response.data));
}

export function getAllPokemonTypes(setPokemonTypes) {
    axios
        .get("http://localhost:8000/api/pokemontypes/")
        .then((response) => setPokemonTypes(response.data));
}

export function getAllPokemonSets(setPokemonCardSets) {
    axios
        .get("http://localhost:8000/api/pokemoncardsets")
        .then((response) => setPokemonCardSets(response.data));
}

export function putSelectedCard(
    pokemonCardData,
    selectedPokemon,
    refreshPokemonCards
) {
    axios
        .put(
            `http://localhost:8000/api/pokemoncards/${selectedPokemon.id}/`,
            pokemonCardData
        )
        .then(() => refreshPokemonCards());
}

export function createNewPokemonCard(pokemonCardData, refreshPokemonCards) {
    axios
        .post("http://localhost:8000/api/pokemoncards/", pokemonCardData)
        .then(() => refreshPokemonCards());
}

export function updateSelectedCollection(
    item,
    collectionObj,
    refreshPokemonCollections
) {
    axios
        .put(
            `http://localhost:8000/api/pokemoncollections/${item.id}/`,
            collectionObj
        )
        .then(() => refreshPokemonCollections());
}

export function createNewCollection(collectionObj, refreshPokemonCollections) {
    axios
        .post("http://localhost:8000/api/pokemoncollections/", collectionObj)
        .then(() => refreshPokemonCollections());
}

export function deleteSelectedCollection(card, refreshPokemonCollections) {
    axios
        .delete(`http://localhost:8000/api/pokemoncollections/${card.id}`)
        .then(() => refreshPokemonCollections());
}

export function deleteSelectedCard(cardID, refreshPokemonCards) {
    axios
        .delete(`http://localhost:8000/api/pokemoncards/${cardID}`)
        .then(() => refreshPokemonCards());
}

export function getFilteredPokemon(typeFilter, setPokemonCards) {
    axios
        .get(`http://localhost:8000/api/pokemoncards?pokemontype=${typeFilter}`)
        .then((response) => setPokemonCards(response.data));
}
