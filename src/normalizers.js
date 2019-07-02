import {isUpperCased} from './utils';

export const normalizeBySeparator = separator => str => {
    return str
        .toLowerCase()
        .split(separator)
        .filter(word => word !== '');
};

export const normalizeCamelCase = str => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (isUpperCased(str[i]) && i > 0) {
            result += ` ${str[i]}`;
        } else {
            result += str[i];
        }
    }
    return normalizeBySeparator(' ')(result);
};