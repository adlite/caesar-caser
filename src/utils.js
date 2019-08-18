export function isUpperCased(str) {
    return str === str.toUpperCase();
}

export function isLowerCased(str) {
    return str === str.toLowerCase();
}

export function isCapitalized(str) {
  return isUpperCased(str[0]) && isLowerCased(str.slice(1));
}

export function capitalize(str) {
    return str.replace(/(?:^|\s)\S/g, found => found.toUpperCase());
}