const caser = require('../lib');

describe('Caser utils methods', () => {
    test('caser.utils.isUpperCased works correctly', () => {
        expect(caser.utils.isUpperCased('SOME TEXT')).toBe(true);
        expect(caser.utils.isUpperCased('some text')).toBe(false);
        expect(caser.utils.isUpperCased('Some Text')).toBe(false);
    });

    test('caser.utils.isLowerCased works correctly', () => {
        expect(caser.utils.isLowerCased('SOME TEXT')).toBe(false);
        expect(caser.utils.isLowerCased('some')).toBe(true);
        expect(caser.utils.isLowerCased('Some Text')).toBe(false);
    });

    test('caser.utils.isCapitalized works correctly', () => {
        expect(caser.utils.isCapitalized('SOME TEXT')).toBe(false);
        expect(caser.utils.isCapitalized('some text')).toBe(false);
        expect(caser.utils.isCapitalized('Some Text')).toBe(true);
        expect(caser.utils.isCapitalized('Some text')).toBe(false);
    });

    test('caser.utils.isCapitalizedFirst works correctly', () => {
        expect(caser.utils.isCapitalizedFirst('SOME TEXT')).toBe(false);
        expect(caser.utils.isCapitalizedFirst('some text')).toBe(false);
        expect(caser.utils.isCapitalizedFirst('Some Text')).toBe(false);
        expect(caser.utils.isCapitalizedFirst('Some text')).toBe(true);
    });

    test('caser.utils.reverse works correctly', () => {
        expect(caser.utils.reverse('SOME TEXT')).toBe('some text');
        expect(caser.utils.reverse('some text')).toBe('SOME TEXT');
        expect(caser.utils.reverse('Some Text')).toBe('sOME tEXT');
        expect(caser.utils.reverse('Some text')).toBe('sOME TEXT');
    });

    test('caser.utils.capitalize works correctly', () => {
        expect(caser.utils.capitalize('SOME TEXT')).toBe('Some Text');
        expect(caser.utils.capitalize('some text')).toBe('Some Text');
        expect(caser.utils.capitalize('Some Text')).toBe('Some Text');
        expect(caser.utils.capitalize('Some text')).toBe('Some Text');
    });

    test('caser.utils.capitalizeFirst works correctly', () => {
        expect(caser.utils.capitalizeFirst('SOME TEXT')).toBe('Some text');
        expect(caser.utils.capitalizeFirst('some text')).toBe('Some text');
        expect(caser.utils.capitalizeFirst('Some Text')).toBe('Some text');
        expect(caser.utils.capitalizeFirst('Some text')).toBe('Some text');
    });
});