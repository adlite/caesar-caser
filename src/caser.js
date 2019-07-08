import builtInRules from './rules';
import { normalizeBySeparator } from './normalizers';
import { detectBySeparator } from './detectors';
import { capitalize } from './utils';

class Caser {
    static rules = builtInRules;

    static registerRule(rule) {
        if (Caser.checkRuleInterface(rule)) {
            Caser.rules.push(rule);
        }
    }

    static registerRules(rules) {
        if (Caser.checkRulesInterface(rules)) {
            rules.forEach(rule => Caser.registerRule(rule));
        }
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
            (typeof rule.name === 'string' || Array.isArray(rule.name)) &&
            (typeof rule.separator === 'string') &&
            (typeof rule.normalizeFunc === 'function' || rule.normalizeFunc === undefined) &&
            (typeof rule.convertFunc === 'function' || rule.convertFunc === undefined) &&
            (typeof rule.detectFunc === 'function' || rule.detectFunc === undefined)
        ) {
            return true;
        }
        throw new TypeError('Rule should be an object with required key "name" and "separator"');
    }

    static checkRulesInterface(rules) {
        if (Array.isArray(rules)) {
            if (rules.every(Caser.checkRuleInterface)) {
                return true;
            };
        }
        throw new TypeError('Rules should be an array of rules objects');
    }

    constructor(string) {
        this.string = string;
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

    capitalize() {
        return capitalize(this.string);
    }

    detect(ruleIfUndetected = 'camel-case') {
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