import API from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//get all X from API endpoints custom hooks

export function useAllPokemonCards(filterParams) {
    return useQuery(["allPokemonCards", filterParams], () =>
        getAllPokemonCards(filterParams)
    );
}

export function useAllCollections(filterCollectionParams) {
    return useQuery(["allCollections", filterCollectionParams], () =>
        getAllCollections(filterCollectionParams)
    );
}

export function useAllTypes() {
    return useQuery(["allTypes"], getAllTypes);
}

export function useAllSets() {
    return useQuery(["allSets"], getAllSets);
}

export function useAllUsers() {
    return useQuery(["allUsers"], getAllUsers);
}

//update endpoints custom hooks

export function useUpdateSelectedCard() {
    const queryClient = useQueryClient();
    return useMutation(updateSelectedCard, {
        onSuccess: () => {
            queryClient.invalidateQueries(["allPokemonCards"]);
        },
    });
}

export function useUpdateSelectedCollection() {
    const queryClient = useQueryClient();
    return useMutation(updateSelectedCollection, {
        onSuccess: () => {
            queryClient.invalidateQueries(["allCollections"]);
        },
    });
}

//create endpoint (POST) custom hook
export function useCreateCard() {
    const queryClient = useQueryClient();
    return useMutation(createNewCard, {
        onSuccess: () => {
            queryClient.invalidateQueries(["allPokemonCards"]);
        },
    });
}

export function useCreateCollection() {
    const queryClient = useQueryClient();
    return useMutation(createNewCollection, {
        onSuccess: () => {
            queryClient.invalidateQueries(["allCollections"]);
        },
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation(createNewUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(["allUsers"]);
        },
    });
}

//delete endpoint custom hook

export function useDeleteSelectedCard() {
    const queryClient = useQueryClient();
    return useMutation(deleteSelectedCard, {
        onSuccess: () => {
            queryClient.invalidateQueries(["allPokemonCards"]);
        },
    });
}

export function useDeleteCollection() {
    const queryClient = useQueryClient();
    return useMutation(deleteSelectedCollection, {
        onSuccess: () => {
            queryClient.invalidateQueries(["allCollections"]);
        },
    });
}

//GET API Calls

const getAllPokemonCards = async (filterParams) => {
    const { pokemonset, pokemontype } = filterParams;
    let filterString = "";
    if (pokemontype !== "") {
        filterString += `pokemontype=${pokemontype}`;
    }
    if (filterString !== "") {
        filterString += "&";
    }
    if (pokemonset !== "") {
        filterString += `pokemonset=${pokemonset}`;
    }
    const { data } = await API.get(`pokemoncards/?${filterString}`);
    return data;
};

const getAllCollections = async (filterCollectionParams) => {
    const { pokemonset, pokemontype } = filterCollectionParams;
    let filterString = "";
    if (pokemontype !== "") {
        filterString += `pokemontype=${pokemontype}`;
    }
    if (filterString !== "") {
        filterString += "&";
    }
    if (pokemonset !== "") {
        filterString += `pokemonset=${pokemonset}`;
    }

    const { data } = await API.get(`pokemoncollections/?${filterString}`);
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

const getAllUsers = async () => {
    const { data } = await API.get("users/");
    let usernames = data.map((user) => {
        return user.username;
    });
    return usernames;
};

// PUT (update) API calls

const updateSelectedCard = async (cardData) => {
    const { data } = await API.put(`pokemoncards/${cardData.id}/`, cardData);
    return data;
};

const updateSelectedCollection = async (collectionData) => {
    const { data } = await API.put(
        `pokemoncollections/${collectionData.id}/`,
        collectionData
    );
    return data;
};

// All POST (create) API calls

const createNewCard = async (newCard) => {
    const { data } = await API.post("pokemoncards/", newCard);
    return data;
};

const createNewCollection = async (collectionData) => {
    const { data } = await API.post("pokemoncollections/", collectionData);
    return data;
};

const createNewUser = async (userData) => {
    const { data } = await API.post("users/", userData);
    return data;
};

// all DELETE API calls

const deleteSelectedCard = async (cardID) => {
    const { data } = await API.delete(`pokemoncards/${cardID}`);
    return data;
};

const deleteSelectedCollection = async (collectionID) => {
    const { data } = await API.delete(`pokemoncollections/${collectionID}`);
    return data;
};
