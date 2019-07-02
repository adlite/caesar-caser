import {
    normalizeCamelCase, 
    normalizeBySeparator
} from './normalizers';
import {
    convertWithUppercase,
    convertWithCapitalize,
    convertCamelCase
} from './converters';

export default [
    {
        name: 'camel-case',
        separator: '',
        normalizeFunc: normalizeCamelCase,
        convertFunc: convertCamelCase,
    },
    {
        name: 'upper-camel-case',
        separator: '',
        normalizeFunc: normalizeCamelCase,
        convertFunc: convertWithCapitalize,
    },
    {
        name: 'kebab-case',
        separator: '-',
    },
    {
        name: 'train-case',
        separator: '-',
        convertFunc: convertWithUppercase,
    },
    {
        name: 'snake-case',
        separator: '_',
    },
    {
        name: 'screaming-snake-case',
        separator: '_',
        convertFunc: convertWithUppercase,
    },
    {
        name: 'dot-case',
        separator: '.',
    },
    {
        name: 'upper-dot-case',
        separator: '.',
        convertFunc: convertWithUppercase,
    },
];