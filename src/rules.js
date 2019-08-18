import { normalizeCamelCase } from './normalizers';
import {
    convertWithUppercase,
    convertWithLowercase,
    convertWithCapitalize,
    convertWithCapitalizeFirstWord,
    convertCamelCase
} from './converters';
import {
    detectUpperCasedBySeparator,
    detectCamelCase,
    detectUpperCamelCase,
    detectSentence,
    detectCapitalizedSentence,
    detectLowerSentence,
    detectUpperSentence
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
    {
      name: 'sentence',
      separator: ' ',
      convertFunc: convertWithCapitalizeFirstWord,
      detectFunc: detectSentence,
    },
    {
      name: 'capitalized-sentence',
      separator: ' ',
      convertFunc: convertWithCapitalize,
      detectFunc: detectCapitalizedSentence,
    },
    {
      name: 'upper-sentence',
      separator: ' ',
      convertFunc: convertWithUppercase,
      detectFunc: detectUpperSentence,
    },
    {
      name: 'lower-sentence',
      separator: ' ',
      convertFunc: convertWithLowercase,
      detectFunc: detectLowerSentence,
    },
];