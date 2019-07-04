import builtInRules from './rules';
import {normalizeBySeparator} from './normalizers';
import {capitalize} from './utils';

class Caser {
    // static rules = builtInRules; TODO: convert syntax by Babel

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
        if (typeof rule === 'object') {
            Caser.checkRuleInterface(rule);
            return rule;
        }

        for (let rule of Caser.rules) {
            if (rule.name === rule) {
                return rule;
            }
        }
        throw new TypeError(`There is no case rule with name "${ruleName}"`);
    }

    static checkRuleInterface(rule) {
        if (typeof rule === 'object') {
            if (
                (typeof rule.name === 'string' || Array.isArray(rule.name)) && 
                typeof rule.separator === 'string'
            ) {
                return true;
            }
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
        this.normalized = [];
    }

    convert(ruleIn, ruleOut) {
        const ruleInDescr = Caser.getRule(ruleIn);
        const ruleOutDescr = Caser.getRule(ruleOut);;

        this.normalize(ruleInDescr);

        const convertFunc = typeof ruleOutDescr.convertFunc === 'function' 
            ? ruleOutDescr.convertFunc
            : word => word;
        return this.normalized
            .map((word, index) => String(convertFunc(word, index, this.normalized)))
            .join(ruleOutDescr.separator);
    }

    normalize(rule) {
        let normalized = null;
        if (typeof rule.normalizeFunc === 'function') {
            normalized = rule.normalizeFunc(this.string);
        } else {
            normalized = normalizeBySeparator(rule.separator)(this.string);
        }

        if (Array.isArray(normalized)) {
            this.normalized = normalized;
        } else {
            throw new TypeError('"normalizeFunc" should return an array of strings');
        }

        return this.normalized;
    }

    convertTo(rule) { }

    capitalize() {
        return capitalize(this.string);
    }

    detect() { }
};

Caser.rules = builtInRules;

export default Caser;