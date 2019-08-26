const caser = require('../lib');

const cases = [
    ['camel-case', 'someTextString'],
    ['upper-camel-case', 'SomeTextString'],
    ['kebab-case', 'some-text-string'],
    ['train-case', 'SOME-TEXT-STRING'],
    ['snake-case', 'some_text_string'],
    ['screaming-snake-case', 'SOME_TEXT_STRING'],
    ['dot-case', 'some.text.string'],
    ['upper-dot-case', 'SOME.TEXT.STRING'],
    ['sentence', 'Some text string'],
    ['capitalized-sentence', 'Some Text String'],
    ['upper-sentence', 'SOME TEXT STRING'],
    ['lower-sentence', 'some text string'],
];

describe('Caser instance methods', () => {
    test('caser.convert() works with all rule convertions', () => {
        cases.forEach(([caseNameA, caseResultA]) => {
            cases.forEach(([caseNameB, caseResultB]) => {
                const value = caser(caseResultA).convert(caseNameA, caseNameB);
                expect(value).toBe(caseResultB);
            });
        });
    });

    test('caser.convertTo() works with all rule convertions', () => {
        cases.forEach(([caseNameA, caseResultA]) => {
            cases.forEach(([caseNameB, caseResultB]) => {
                const value = caser(caseResultA).convertTo(caseNameB);
                expect(value).toBe(caseResultB);
            });
        });
    });

    test('caser.detect() works with all rules', () => {
        cases.forEach(([caseName, caseResult]) => {
            const value = caser(caseResult).detect();
            expect(value).toBe(caseName);
        });
    });

    test('caser.detect(priorityRule) works with all rules', () => {
        cases.forEach(([caseName]) => {
            const value = caser('ohmygodwhatisit').detect(caseName);
            expect(value).toBe(caseName);
        });
    });
});