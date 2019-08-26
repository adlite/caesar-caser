const caser = require('../lib');

const cases = [
    ['camel', 'someTextString'],
    ['pascal', 'SomeTextString'],
    ['kebab', 'some-text-string'],
    ['train', 'SOME-TEXT-STRING'],
    ['snake', 'some_text_string'],
    ['constant', 'SOME_TEXT_STRING'],
    ['dot', 'some.text.string'],
    ['upper-dot', 'SOME.TEXT.STRING'],
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

    test('caser.normalize(ruleName) works with all rules', () => {
        cases.forEach(([caseName, caseResult]) => {
            const value = caser(caseResult).normalize(caseName);
            expect(value).toEqual(['some', 'text', 'string']);
        });
    });
});