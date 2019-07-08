import {
    normalizeCamelCase,
    normalizeBySeparator
} from './normalizers';
import {
    convertWithUppercase,
    convertWithCapitalize,
    convertCamelCase
} from './converters';
import {
    detectUpperCasedBySeparator,
    detectCamelCase,
    detectUpperCamelCase
} from './detectors';

export default [
    {
        name: 'camel-case',
        separator: '',
        normalizeFunc: normalizeCamelCase,
        convertFunc: convertCamelCase,
        detectFunc: detectCamelCase,
    },
    {
        name: 'upper-camel-case',
        separator: '',
        normalizeFunc: normalizeCamelCase,
        convertFunc: convertWithCapitalize,
        detectFunc: detectUpperCamelCase,
    },
    {
        name: 'kebab-case',
        separator: '-',
    },
    {
        name: 'train-case',
        separator: '-',
        convertFunc: convertWithUppercase,
        detectFunc: detectUpperCasedBySeparator('-'),
    },
    {
        name: 'snake-case',
        separator: '_',
    },
    {
        name: 'screaming-snake-case',
        separator: '_',
        convertFunc: convertWithUppercase,
        detectFunc: detectUpperCasedBySeparator('_'),
    },
    {
        name: 'dot-case',
        separator: '.',
    },
    {
        name: 'upper-dot-case',
        separator: '.',
        convertFunc: convertWithUppercase,
        detectFunc: detectUpperCasedBySeparator('.'),
    },
];