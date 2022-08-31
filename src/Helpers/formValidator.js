function isValidUrl(urlString) {
    let url;
    try {
        url = new URL(urlString);
    } catch (e) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

function isValidEmail(email) {
    var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex) ? true : false;
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

export function validateUser(userData, usernames) {
    let validationResponse = { valid: true, message: "" };

    if (userData.username === "") {
        validationResponse = {
            valid: false,
            message: "Please complete all fields",
        };
    }
    if (usernames.includes(userData.username)) {
        validationResponse = {
            valid: false,
            message: "Username is already being used",
        };
    }

    if (userData.password === "" || userData.password.length < 8) {
        validationResponse = {
            valid: false,
            message: "Please enter a password of at least 8 characters",
        };
    }

    if (!isValidEmail(userData.email)) {
        validationResponse = {
            valid: false,
            message: "Please enter valid email",
        };
    }

    if (!isValidUrl(userData.profilePic)) {
        validationResponse = {
            valid: false,
            message: "Please enter valid URL",
        };
    }
    return validationResponse;
}
