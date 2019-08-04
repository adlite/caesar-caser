const caser = require('../lib');

describe('Caser module tests', () => {
    test('typeof caser === "function"', () => {
        expect(typeof caser).toBe('function');
    });

    test('caser.default === undefined', () => {
        expect(caser.default).toBeUndefined();
    });
    
    // TODO: check this strange test
    test('caserFacade returns instance of Caser', () => {
        const instance = caser('str');
        expect(instance).toBeInstanceOf(instance.__proto__.constructor);
    });

    test('caser.registerRule and caser.registerRules are functions', () => {
        expect(typeof caser.registerRule).toBe('function');
        expect(typeof caser.registerRules).toBe('function');
    });
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