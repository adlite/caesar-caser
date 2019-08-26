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
        name: 'camel',
        separator: '',
        normalizeFunc: normalizeCamelCase,
        convertFunc: convertCamelCase,
        detectFunc: detectCamelCase,
    },
    {
        name: 'pascal',
        separator: '',
        normalizeFunc: normalizeCamelCase,
        convertFunc: convertWithCapitalize,
        detectFunc: detectUpperCamelCase,
    },
    {
        name: 'kebab',
        separator: '-',
    },
    {
        name: 'train',
        separator: '-',
        convertFunc: convertWithUppercase,
        detectFunc: detectUpperCasedBySeparator('-'),
    },
    {
        name: 'snake',
        separator: '_',
    },
    {
        name: 'constant',
        separator: '_',
        convertFunc: convertWithUppercase,
        detectFunc: detectUpperCasedBySeparator('_'),
    },
    {
        name: 'dot',
        separator: '.',
    },
    {
        name: 'upper-dot',
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