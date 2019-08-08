const caser = require('../lib');

describe('Caser static methods', () => {
    test('caser.registerRule() throws an error if rule has wrong interface', () => {
        expect(() => {
            caser.registerRule({});
        }).toThrowError(TypeError);

        expect(() => {
            caser.registerRule({name: 'rule-name'});
        }).toThrowError(TypeError);

        expect(() => {
            caser.registerRule({separator: ':'});
        }).toThrowError(TypeError);
    });

    test('caser.registerRule() works', () => {
        // register
        caser.registerRule({
            name: 'semicolon-case',
            separator: ':'
        });
        // check registered rule
        const value = caser('someText').convertTo('semicolon-case');
        expect(value).toBe('some:text');
    });

    test('caser.registerRules() works', () => {
        // register
        caser.registerRules([
            {
                name: 'at-case',
                separator: '@'
            },
            {
                name: 'pipe-case',
                separator: '|'
            },
        ]);
        // check registered rules
        const atCaseValue = caser('someText').convertTo('at-case');
        expect(atCaseValue).toBe('some@text');

        const pipeCaseValue = caser('someText').convertTo('pipe-case');
        expect(pipeCaseValue).toBe('some|text');
    });

    test('caser.registerRules() throws an error if rules have wrong interfaces', () => {
        expect(() => {
            caser.registerRules({});
        }).toThrowError(TypeError);

        expect(() => {
            caser.registerRules([1, 2]);
        }).toThrowError(TypeError);

        expect(() => {
            caser.registerRules([
                {
                    name: 'any-name',
                    separator: 'б_б'
                },
                'I am an evil string'
            ]);
        }).toThrowError(TypeError);

        // Empty array just do nothing
        expect(() => {
            caser.registerRules([]);
        }).not.toThrowError(TypeError);
    });

    test('caser.registerRule() with convertFunc param works', () => {
        // register
        const convertFunc = jest.fn((word, index, words) => {
            return word.toUpperCase();
        });
        caser.registerRule({
            name: 'convert-func-case',
            separator: '~',
            convertFunc: convertFunc
        });

        // check registered rule
        const value = caser('some_text_string').convertTo('convert-func-case');
        expect(convertFunc).toBeCalledTimes(3);
        expect(convertFunc).toBeCalledWith(expect.any(String), expect.any(Number), expect.any(Array));
    });

    test('caser.registerRule() with normalizeFunc param works', () => {
        // register
        const normalizeFunc = jest.fn(str => {
            return str.toLowerCase().split('~');
        });
        caser.registerRule({
            name: 'normalize-func-case',
            separator: '~',
            normalizeFunc: normalizeFunc
        });

        // check registered rule
        const value = caser('some~STRANGE~case~RuLe').convert('normalize-func-case', 'camel-case');
        expect(value).toBe('someStrangeCaseRule');
        expect(normalizeFunc).toBeCalledTimes(1);
        expect(normalizeFunc).toBeCalledWith(expect.any(String));
    });

    test('caser.registerRule() with detectFunc param works', () => {
        // register
        const detectFunc = jest.fn(str => {
            return str.trim().split('#').length - 1;
        });
        caser.registerRule({
            name: 'hash-case',
            separator: '--',
            detectFunc: detectFunc // specify detectFunc instead of separator
        });

        // check registered rule
        const value = caser('hash#case#string').detect();
        expect(value).toBe('hash-case');
        expect(detectFunc).toBeCalledTimes(1);
        expect(detectFunc).toBeCalledWith(expect.any(String));
    });
});

describe('Caser instance methods', () => {
    
});

// caser.registerRule({
//     name: 'semicolon-case',
//     separator: ':',
//     convertFunc: (word, index, words) => {
//         return caser(word).capitalize();
//     }
// });

// console.log(caser('kebab-addr-casa-name').convert('kebab-case', 'semicolon-case'));
// console.log(caser('someShittyVar').convert('camel-case', 'snake-case'));
// console.log(caser('someShittyVar').convert('camel-case', 'kebab-case'));
// console.log(caser('SOME_TRAIN').convert('screaming-snake-case', 'camel-case'));
// console.log(caser('SomeShittyVar').convert('upper-camel-case', 'train-case'));
// console.log('---DETECT---');
// console.log(caser('kebab-addr-case').detect());
// console.log(caser('KEBAB-UPPER-CASE').detect());
// console.log(caser('SOME_TRAIN').detect());
// console.log(caser('some_train').detect());
// console.log(caser('some.dot.case').detect());
// console.log(caser('SOME.UPPER.DOT.CASE').detect());
// console.log(caser('camelCaseString').detect('semicolon-case'));
// console.log(caser('CamelCaseString').detect('semicolon-case'));
// console.log(caser('CamelCase_String').detect('semicolon-case'));
// console.log(caser('camelCase camelSasString').detect('semicolon-case'));
// console.log(caser('  camelSasString        ').detect('semicolon-case'));

// console.log(caser('kebab-addr-case').convertTo('upper-camel-case'));
// console.log(caser('KEBAB-UPPER-CASE').convertTo('upper-camel-case'));
// console.log(caser('SOME_TRAIN').convertTo('upper-camel-case'));
// console.log(caser('some_train').convertTo('upper-camel-case'));
// console.log(caser('some.dot.case').convertTo('upper-camel-case'));
// console.log(caser('SOME.UPPER.DOT.CASE').convertTo('camel-case'));