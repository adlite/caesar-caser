import builtInRules from './rules';
import { normalizeBySeparator } from './normalizers';
import { detectBySeparator } from './detectors';

class Caser {
    static rules = builtInRules;

    static registerRule(ruleDescr) {
        Caser.checkRuleInterface(ruleDescr);
        const foundRuleIndex = Caser.rules.findIndex(rule => rule.name === ruleDescr.name);

        if (foundRuleIndex === -1) { // if rule with given name does not exist
            Caser.rules.push(ruleDescr);
        } else { // if exists Caser should override it
            Caser.rules[foundRuleIndex] = ruleDescr;
        }
    }

    static registerRules(rules) {
        if (Array.isArray(rules)) {
            rules.forEach(rule => Caser.registerRule(rule));
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

    convert(ruleIn, ruleOut) {
        const ruleInDescr = Caser.getRule(ruleIn);
        const ruleOutDescr = Caser.getRule(ruleOut);

        const normalized = this.normalize(ruleInDescr);

        const convertFunc = typeof ruleOutDescr.convertFunc === 'function'
            ? ruleOutDescr.convertFunc
            : word => word;
        return normalized
            .map((word, index) => String(convertFunc(word, index, normalized)))
            .join(ruleOutDescr.separator);
    }

    normalize(rule) {
        let normalized = null;
        if (typeof rule.normalizeFunc === 'function') {
            normalized = rule.normalizeFunc(this.string);
        } else {
            normalized = normalizeBySeparator(rule.separator)(this.string);
        }

        if (!Array.isArray(normalized)) {
            throw new TypeError('"normalizeFunc" should return an array of strings');
        }

        return normalized;
    }

    convertTo(rule) {
        return this.convert(this.detect(), rule);
    }

    detect(ruleIfUndetected = Caser.rules[0]) {
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
            name: ruleIfUndetected,
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

        return maxWeight.name;
    }
};

export default Caser;