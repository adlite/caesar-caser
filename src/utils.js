export function isUpperCased(str) {
    return str === str.toUpperCase();
}

export function isLowerCased(str) {
    return str === str.toLowerCase();
}

export function isCapitalized(str) {
    return str
            .match(/.+?(?:\s)|.+$/g)
            .every(word => isCapitalizedFirst(word));
}

export function isCapitalizedFirst(str) {
    return isUpperCased(str[0]) && isLowerCased(str.slice(1));
}

export function capitalize(str) {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, found => found.toUpperCase());
}

export function capitalizeFirst(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function reverse(str) {
    return str.replace(/./g, found => isUpperCased(found) ? found.toLowerCase() : found.toUpperCase());
}