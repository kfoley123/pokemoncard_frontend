import API from "./api";
import { useQuery } from "@tanstack/react-query";

//get all X from API endpoints custom hooks

export function useAllPokemonCards() {
    return useQuery(["allPokemonCards"], getAllPokemonCards);
}

export function useAllCollections() {
    return useQuery(["allCollections"], getAllCollections);
}

export function useAllTypes() {
    return useQuery(["allTypes"], getAllTypes);
}

export function useAllSets() {
    return useQuery(["allSets"], getAllSets);
}

//GET API Calls

const getAllPokemonCards = async () => {
    const { data } = await API.get("pokemoncards/");
    return data;
};

const getAllCollections = async () => {
    const { data } = await API.get("pokemoncollections/");
    return data;
};

const getAllTypes = async () => {
    const { data } = await API.get("pokemontypes/");
    return data;
};

const getAllSets = async () => {
    const { data } = await API.get("pokemoncardsets/");
    return data;
};

// PUT (update) API calls

export const updateSelectedCard = async (cardData) => {
    const { data } = await API.put(`pokemoncards/${cardData.id}/`, cardData);
    return data;
};

export const updateSelectedCollection = async (collectionData) => {
    const { data } = await API.put(
        `pokemoncollections/${collectionData.id}/`,
        collectionData
    );
    return data;
};

// All POST (create) API calls

export const createNewCard = async (newCard) => {
    const { data } = await API.post("pokemoncards/", newCard);
    return data;
};

export const createNewCollection = async (collectionData) => {
    const { data } = await API.post("pokemoncollections/", collectionData);
    return data;
};

// all DELETE API calls

export const deleteSelectedCard = async (cardID) => {
    const { data } = await API.delete(`pokemoncards/${cardID}`);
    return data;
};

export const deleteSelectedCollection = async (collectionID) => {
    const { data } = await API.delete(`pokemoncollections/${collectionID}`);
    return data;
};

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
