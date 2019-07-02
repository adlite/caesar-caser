import caseType, {getCaseTypeDescrByName} from './types';
import walker from './walker';
import {isUpperCased, capitalize} from './utils';

function normalizeBySeparator(str, separator) {
    return str
        .toLowerCase()
        .split(separator)
        .filter(chunk => chunk !== '');
}

function normalizeCamelCase(str) {
    let result = '';
    walker(str).walk(({current, index}) => {
        if (isUpperCased(current) && index > 0) {
            result += `-${current}`;
        } else {
            result += current;
        }
    });
    return normalizeBySeparator(result, '-');
}

function normalize(str, type) {
    const caseTypeDescr = getCaseTypeDescrByName(type);
    if (!caseTypeDescr) {
        return [];
    }

    if (caseTypeDescr.name === caseType.camelCase ||
        caseTypeDescr.name === caseType.upperCamelCase) {
        return normalizeCamelCase(str);
    }

    return normalizeBySeparator(str, caseTypeDescr.separator);
}

function convertToCamelCase(normalizedArr, isUpperCamelCase = false) {
    return normalizedArr
        .map((chunk, index) => {
            return !isUpperCamelCase && index === 0 ? chunk : capitalize(chunk);
        })
        .join('');
}

function convertBySeparator(normalizedArr, separator, isUpperCased = false) {
    const joined = normalizedArr.join(separator);
    return isUpperCased ? joined.toUpperCase() : joined;
}

export function convert(str, fromCaseType, toCaseType) {
    const normalized = normalize(str, fromCaseType);

    switch(toCaseType) {
        case caseType.camelCase:
            return convertToCamelCase(normalized);
        case caseType.upperCamelCase:
            return convertToCamelCase(normalized, true);
        case caseType.kebabCase:
            return convertBySeparator(normalized, '-');
        case caseType.trainCase:
            return convertBySeparator(normalized, '-', true);
        case caseType.snakeCase:
            return convertBySeparator(normalized, '_');
        case caseType.screamingSnakeCase:
            return convertBySeparator(normalized, '_', true);
        case caseType.dotCase:
            return convertBySeparator(normalized, '.');
        case caseType.upperDotCase:
                return convertBySeparator(normalized, '.', true);
        default:
            return str.toLowerCase();
    }
}