const caseTypesDescr = {
    auto: {
        name: 'auto'
    },
    camelCase: {
        name: 'camel-case'
    },
    upperCamelCase: {
        name: 'upper-camel-case'
    },
    kebabCase: {
        name: 'kebab-case',
        separator: '-',
    },
    trainCase: {
        name: 'train-case',
        separator: '-',
        upperCased: true
    },
    snakeCase: {
        name: 'snake-case',
        separator: '_'
    },
    screamingSnakeCase: {
        name: 'screaming-snake-case',
        separator: '_',
        upperCased: true
    },
    dotCase: {
        name: 'dot-case',
        separator: '.'
    },
    upperDotCase: {
        name: 'upper-dot-case',
        separator: '.',
        upperCased: true
    }
};

function getCaseTypesMap() {
    let result = {};
    for (let key in caseTypesDescr) {
        result[key] = caseTypesDescr[key].name;
    }
    return result;
}

export function getCaseTypeDescrByName(name) {
    for (let key in caseTypesDescr) {
        if (caseTypesDescr[key].name === name) {
            return caseTypesDescr[key];
        }
    }
    return null;
}

export default getCaseTypesMap();