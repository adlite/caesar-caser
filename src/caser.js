import builtInRules from './rules';
import { normalizeBySeparator } from './normalizers';
import { detectBySeparator } from './detectors';

class Caser {
    static rules = builtInRules;

    static addRule(ruleDescr) {
        Caser.checkRuleInterface(ruleDescr);
        const foundRuleIndex = Caser.rules.findIndex(rule => rule.name === ruleDescr.name);

        if (foundRuleIndex === -1) { // if rule with given name does not exist
            Caser.rules.push(ruleDescr);
        } else { // if exists Caser should override it
            Caser.rules[foundRuleIndex] = ruleDescr;
        }
    }

    static addRules(rules) {
        if (Array.isArray(rules)) {
            rules.forEach(rule => Caser.addRule(rule));
        }
    }

    static removeRule(ruleName) {
        Caser.rules.forEach((rule, index) => {
            if (rule.name === ruleName) {
                Caser.rules.splice(index, 1);
            }
        });
    }

    static getRule(rule) {
        // if rule is object
        if (typeof rule === 'object') {
            Caser.checkRuleInterface(rule);
            return rule;
        }

        // if rule is string
        const foundRule = Caser.rules.find(ruleDescr => {
            return ruleDescr.name === rule;
        });
        if (!foundRule) {
            throw new TypeError(`There is no case rule with name "${rule}"`);
        }
        return foundRule;
    }

    static checkRuleInterface(rule) {
        if (
            (typeof rule === 'object') &&
            (typeof rule.name === 'string') &&
            (typeof rule.separator === 'string') &&
            (typeof rule.normalizeFunc === 'function' || rule.normalizeFunc === undefined) &&
            (typeof rule.convertFunc === 'function' || rule.convertFunc === undefined) &&
            (typeof rule.detectFunc === 'function' || rule.detectFunc === undefined)
        ) {
            return true;
        }
        throw new TypeError('Rule should be an object with required key "name" and "separator"');
    }

    constructor(str) {
        this.string = String(str);
    }

    convert(ruleInName, ruleOutName) {
        const ruleOut = Caser.getRule(ruleOutName);
        const normalized = this.normalize(ruleInName);

        const convertFunc = typeof ruleOut.convertFunc === 'function'
            ? ruleOut.convertFunc
            : word => word;
        return normalized
            .map((word, index) => String(convertFunc(word, index, normalized)))
            .join(ruleOut.separator);
    }

    normalize(ruleName) {
        const rule = Caser.getRule(ruleName);
        const normalizeFunc = rule.normalizeFunc || normalizeBySeparator(rule.separator);
        const normalized = normalizeFunc(this.string);

        if (!Array.isArray(normalized)) {
            throw new TypeError('"normalizeFunc" should return an array of strings');
        }

        return normalized;
    }

    convertTo(ruleName) {
        return this.convert(this.detect(), ruleName);
    }

    detect(priorityRuleName) {
        const weights = {};

        Caser.rules.forEach(rule => {
            const detectFunc = rule.detectFunc || detectBySeparator(rule.separator);
            const weight = detectFunc(this.string);

            if (typeof weight !== 'number') {
                throw new TypeError('"detectFunc" should return a weight number');
            }

            weights[rule.name] = weight;
        });

        // Find max weight
        let maxWeight = {
            name: Caser.rules[0].name,
            value: 0
        };
        for (const ruleName in weights) {
            if (weights[ruleName] > maxWeight.value) {
                maxWeight = {
                    name: ruleName,
                    value: weights[ruleName]
                };
            }
        }

        // Duplicates with max weight for rule priority detection
        if (priorityRuleName) {
            const duplicates = Object.keys(weights).filter(key => weights[key] === maxWeight.value);
            if (duplicates.length > 1) {
                const foundRule = duplicates.find(ruleName => ruleName === priorityRuleName);
                if (foundRule) return foundRule;
            }
        }

        return maxWeight.name;
    }
};

export default Caser;