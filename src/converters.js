import { capitalize } from './utils';

export const convertWithUppercase = word => word.toUpperCase();

export const convertWithCapitalize = word => capitalize(word);

export const convertCamelCase = (word, index) => {
    return index > 0 ? convertWithCapitalize(word) : word;
};