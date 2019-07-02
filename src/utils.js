export function isUpperCased(char) {
    return char === char.toUpperCase();
}

export function isLowerCased(char) {
    return char === char.toLowerCase();
}

export function capitalize(str) {
    return str.replace(/(?:^|\s)\S/g, found => found.toUpperCase());
}

export function insertIntoString(str, strToInsert, index) {
    return str.slice(0, index) + strToInsert + str.slice(index);
}