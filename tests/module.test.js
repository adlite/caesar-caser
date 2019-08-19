const caser = require('../lib');

describe('Caser module tests', () => {
    test('typeof caser === "function"', () => {
        expect(typeof caser).toBe('function');
    });

    test('caser.default === undefined', () => {
        expect(caser.default).toBeUndefined();
    });
    
    test('caserFacade returns instance of Caser', () => {
        const instance = caser('str');
        expect(instance).toBeInstanceOf(instance.__proto__.constructor);
    });

    test('caser.registerRule and caser.registerRules are functions', () => {
        expect(typeof caser.registerRule).toBe('function');
        expect(typeof caser.registerRules).toBe('function');
    });

    test('caser.utils is object', () => {
        expect(typeof caser.utils).toBe('object');
        expect(Array.isArray(caser.utils)).toBe(false);
    });
});