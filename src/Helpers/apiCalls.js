import API from "./api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAllPokemonCards() {
    return useQuery(["allPokemonCards"], asyncAllPokemonCards);
}

const asyncAllPokemonCards = async () => {
    const { data } = await API.get("pokemoncards/");
    return data;
};

export function useAllCollections() {
    return useQuery(["allCollections"], getAllCollections);
}

const getAllCollections = async () => {
    const { data } = await API.get("pokemoncollections/");
    return data;
};

export function useAllTypes() {
    return useQuery(["allTypes"], getAllTypes);
}

const getAllTypes = async () => {
    const { data } = await API.get("pokemontypes/");
    return data;
};

export function useAllSets() {
    return useQuery(["allSets"], getAllSets);
}

const getAllSets = async () => {
    const { data } = await API.get("pokemoncardsets/");
    return data;
};

// export function putSelectedCard(
//     pokemonCardData,
//     selectedPokemon,
//     refreshPokemonCards
// ) {
//     API.put(`pokemoncards/${selectedPokemon.id}/`, pokemonCardData).then(() =>
//         refreshPokemonCards()
//     );
// }

export const updateSelectedCard = async (cardData) => {
    console.log(cardData);
    const { data } = await API.put(`pokemoncards/${cardData.id}/`, cardData);
    return data;
};

export const createNewCard = async (newCard) => {
    const { data } = await API.post("pokemoncards/", newCard);
    return data;
};

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
