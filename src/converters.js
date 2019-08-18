import { capitalize } from './utils';

export const convertWithUppercase = word => word.toUpperCase();

export const convertWithLowercase = word => word.toLowerCase();

export const convertWithCapitalize = word => capitalize(word);

export const convertWithCapitalizeFirstWord = (word, index) => {
    return index === 0 ? capitalize(word) : word;
};

export const convertCamelCase = (word, index) => {
    return index > 0 ? convertWithCapitalize(word) : word;
};