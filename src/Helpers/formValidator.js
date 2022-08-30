function isValidUrl(urlString) {
    let url;
    try {
        url = new URL(urlString);
    } catch (e) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

export function validateCard(cardData) {
    let validationResponse = { valid: true, message: "" };

    if (!isValidUrl(cardData.image)) {
        validationResponse = {
            valid: false,
            message: "Please enter valid URL",
        };
    }
    if (isNaN(cardData.pokedexIndex)) {
        validationResponse = {
            valid: false,
            message: "Please enter Pokedex Index as a number",
        };
    }

    if (cardData.name === "") {
        validationResponse = {
            valid: false,
            message: "Please complete all fields",
        };
    }

    if (cardData.type === 0) {
        validationResponse = {
            valid: false,
            message: "Please select a type",
        };
    }
    if (isNaN(cardData.HP)) {
        validationResponse = {
            valid: false,
            message: "Please enter HP as a number",
        };
    }
    if (cardData.pokemonCardSet === 0) {
        validationResponse = {
            valid: false,
            message: "Please select a set",
        };
    }
    return validationResponse;
}
