// Type definitions for caesar-caser
// Project: caesar-caser
// Definitions by: Adlite <adlite@yandex.ru> (https://github.com/adlite/)

declare namespace CaeserCaser {
    export interface IRuleDescriptor {
        name: string;
        separator: string;
        normalizeFunc?: (str: string) => string[];
        convertFunc?: (word: string, index: number, normalized: string[]) => string;
        detectFunc?: (str: string) => number;
    }

    export interface IUtils {
        isUpperCased(str: string): boolean;
        isLowerCased(str: string): boolean;
        isCapitalized(str: string): boolean;
        isCapitalizedFirst(str: string): boolean;
        capitalize(str: string): string;
        capitalizeFirst(str: string): string;
        reverse(str: string): string;
    }

    class Caser {
        static rules: IRuleDescriptor[];

        static addRule(ruleDescr: IRuleDescriptor): void;

        static addRules(rules: IRuleDescriptor[]): void;

        static removeRule(ruleName: string): void;

        static getRule(rule: string): IRuleDescriptor;
        static getRule(rule: IRuleDescriptor): IRuleDescriptor;

        static checkRuleInterface(rule: IRuleDescriptor): boolean;

        constructor(string: string);

        convert(ruleInName: string, ruleOutName: string): string;

        convertTo(ruleName: string): string;

        normalize(ruleName?: string): string[];

        detect(priorityRuleName?: string): string;
    }

    export function addRule(ruleDescr: IRuleDescriptor): void;
    export function addRules(rules: IRuleDescriptor[]): void;
    export function removeRule(ruleName: string): void;
    export const utils: IUtils;
}

export default function caserFacade(str: string): CaeserCaser.Caser;

export as namespace CaeserCaser;