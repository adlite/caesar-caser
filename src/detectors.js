import { isUpperCased } from './utils';

export const detectBySeparator = separator => str => {
    return str.trim().split(separator).length - 1;
};

export const detectUpperCasedBySeparator = separator => str => {
    let baseWeight = detectBySeparator(separator)(str);
    if (baseWeight === 0) {
        return 0;
    }
    return isUpperCased(str) ? baseWeight + 1 : 0;
};