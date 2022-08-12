import API from "./api";
import { useQuery } from "@tanstack/react-query";

export function useAllPokemonCards() {
    return useQuery(["allPokemonCards"], asyncAllPokemonCards);
}

const asyncAllPokemonCards = async () => {
    const { data } = await API.get("pokemoncards/");
    return data;
};

export function getAllPokemonCards(setPokemonCards) {
    return API.get("pokemoncards/").then((response) =>
        setPokemonCards(response.data)
    );
}
console.log(API);

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

export function getFilteredPokemonCards(filterParams, setPokemonCards) {
    let filterString = "";
    if (filterParams.pokemontype !== "") {
        filterString += `pokemontype=${filterParams.pokemontype}`;
    }
    if (filterString !== "") {
        filterString += "&";
    }
    if (filterParams.pokemonset !== "") {
        filterString += `pokemonset=${filterParams.pokemonset}`;
    }

    API.get(`pokemoncards?${filterString}`).then((response) =>
        setPokemonCards(response.data)
    );
}

export function getFilteredPokemonCollection(
    filterCollectionParams,
    setCollectedArray
) {
    let filterString = "";
    if (filterCollectionParams.pokemontype !== "") {
        filterString += `pokemontype=${filterCollectionParams.pokemontype}`;
    }
    if (filterString !== "") {
        filterString += "&";
    }
    if (filterCollectionParams.pokemonset !== "") {
        filterString += `pokemonset=${filterCollectionParams.pokemonset}`;
    }

    API.get(`pokemoncollections?${filterString}`).then((response) =>
        setCollectedArray(response.data)
    );
}
