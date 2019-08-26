const caser = require('../lib');

describe('Caser static methods', () => {
    test('caser.addRule() throws an error if rule has wrong interface', () => {
        expect(() => {
            caser.addRule({});
        }).toThrowError(TypeError);

        expect(() => {
            caser.addRule({name: 'rule-name'});
        }).toThrowError(TypeError);

        expect(() => {
            caser.addRule({separator: ':'});
        }).toThrowError(TypeError);
    });

    test('caser.addRule() works', () => {
        // register
        caser.addRule({
            name: 'semicolon',
            separator: ':'
        });
        // check registered rule
        const value = caser('someText').convertTo('semicolon');
        expect(value).toBe('some:text');
    });

    test('caser.addRule() can override rule with the same name', () => {
        // check built-in rule 'dot'
        const oldValue = caser('someText').convertTo('semicolon');
        expect(oldValue).toBe('some:text');
        // register new rule with the same name
        caser.addRule({
            name: 'semicolon',
            separator: '::'
        });
        // convert with new separator
        const newValue = caser('someText').convertTo('semicolon');
        expect(newValue).toBe('some::text');
    });

    test('caser.removeRule() works', () => {
        // removing previously registered rule
        caser.removeRule('semicolon');
        // removed rule should throw an error
        expect(() => {
            caser('someText').convertTo('semicolon')
        }).toThrowError(TypeError);
    });

    test('caser.addRules() works', () => {
        // register
        caser.addRules([
            {
                name: 'semicolon',
                separator: ':'
            },
            {
                name: 'double-semicolon',
                separator: '::'
            },
        ]);
        // check registered rules
        const semicolonValue = caser('someText').convertTo('semicolon');
        expect(semicolonValue).toBe('some:text');

        const doubleSemicolonValue = caser('someText').convertTo('double-semicolon');
        expect(doubleSemicolonValue).toBe('some::text');
    });

    test('caser.addRules() throws an error if one of the rules has wrong interfaces', () => {
        expect(() => {
            caser.addRules([1, 2]);
        }).toThrowError(TypeError);

        expect(() => {
            caser.addRules([
                {
                    name: 'test',
                    separator: 'б_б'
                },
                'I am an evil string'
            ]);
        }).toThrowError(TypeError);

        // Empty array just do nothing
        expect(() => {
            caser.addRules([]);
        }).not.toThrowError(TypeError);
    });

    test('caser.addRule() with convertFunc param works', () => {
        // register
        const convertFunc = jest.fn((word, index, words) => {
            return word.toUpperCase();
        });
        caser.addRule({
            name: 'semicolon',
            separator: ':',
            convertFunc: convertFunc
        });

        // check registered rule
        const value = caser('someTextString').convertTo('semicolon');
        expect(convertFunc).toBeCalledTimes(3);
        expect(convertFunc).toBeCalledWith(expect.any(String), expect.any(Number), expect.any(Array));
        expect(value).toBe('SOME:TEXT:STRING');

        // remove rule
        caser.removeRule('semicolon');
    });

    test('caser.addRule() with normalizeFunc param works', () => {
        // register
        const normalizeFunc = jest.fn(str => {
            return str.toLowerCase().split(':');
        });
        caser.addRule({
            name: 'semicolon',
            separator: ':',
            normalizeFunc: normalizeFunc
        });

        // check registered rule
        const value = caser('some:text:string').convert('semicolon', 'camel');
        expect(value).toBe('someTextString');
        expect(normalizeFunc).toBeCalledTimes(1);
        expect(normalizeFunc).toBeCalledWith(expect.any(String));

        // remove rule
        caser.removeRule('semicolon');
    });

    test('caser.addRule() throws an error when normalizeFunc returns not array', () => {
        // register
        const normalizeFunc = jest.fn(str => {
            return 0;
        });
        caser.addRule({
            name: 'semicolon',
            separator: ':',
            normalizeFunc: normalizeFunc
        });

        expect(() => {
            caser('some:text:string').convert('semicolon', 'camel');
        }).toThrowError(TypeError);

        // remove rule
        caser.removeRule('semicolon');
    });

    test('caser.addRule() with detectFunc param works', () => {
        // register rule
        caser.addRule({
            name: 'semicolon',
            separator: ':'
        });

        // register rule with the same separator but it also has detectFunc
        const detectFunc = jest.fn(str => {
            const baseWeight = str.trim().split(':').length - 1;
            return caser.utils.isUpperCased(str) ? baseWeight + 1 : baseWeight; 
        });
        caser.addRule({
            name: 'upper-semicolon',
            separator: ':',
            detectFunc: detectFunc
        });

        // check registered rules
        const value = caser('some:text:string').detect();

        expect(detectFunc).toBeCalledTimes(1);
        expect(detectFunc).toBeCalledWith(expect.any(String));

        const upperValue = caser('SOME:TEXT:STRING').detect();

        expect(value).toBe('semicolon');
        expect(upperValue).toBe('upper-semicolon');

        // remove rules
        caser.removeRule('semicolon');
        caser.removeRule('upper-semicolon');
    });
});