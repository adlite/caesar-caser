import {
  isUpperCased,
  isLowerCased,
  isCapitalizedFirst
} from './utils';

export const detectBySeparator = separator => str => {
  return str.trim().split(separator).length - 1;
};

export const detectUpperCasedBySeparator = separator => str => {
  let baseWeight = detectBySeparator(separator)(str);
  if (baseWeight === 0) {
    return 0;
  }
  return isUpperCased(str) ? baseWeight + 1 : 0;
};

export const detectCamelCase = str => {
  const trimmedStr = str.trim();
  const nonWordsMatches = trimmedStr.match(/[^a-zA-Z0-9]/gi) || '';
  const upperCaseLettersMatches = trimmedStr.match(/[A-Z]/g) || '';
  if (
    isUpperCased(trimmedStr[0]) || // if first letter is uppercased
    detectBySeparator(' ')(trimmedStr) > 0 || // if sentence
    nonWordsMatches.length > 0 || // if has non-word characters
    isUpperCased(trimmedStr) // if full uppercased
  ) {
    return 0;
  }
  return upperCaseLettersMatches.length; // returns count of uppercased latin characters
};

export const detectUpperCamelCase = str => {
  const trimmedStr = str.trim();
  if (isLowerCased(trimmedStr[0])) {
    return 0;
  }
  return detectCamelCase(trimmedStr[0].toLowerCase() + trimmedStr.slice(1));
};

export const detectSentence = str => {
  let weight = detectBySeparator(' ')(str);
  return isUpperCased(str[0]) ? weight + 1 : 0;
};

function getWeightOfSentence(sentence, callback) {
  let weight = detectBySeparator(' ')(sentence);
  const splittedStr = sentence.trim().split(' ');
  // check every word in a sentence by callback function
  if (splittedStr.length > 1 && splittedStr.every(callback)) {
    weight += splittedStr.length;
  }
  return weight;
}

export const detectCapitalizedSentence = str => {
  return getWeightOfSentence(str, word => isCapitalizedFirst(word));
};

export const detectUpperSentence = str => {
  return getWeightOfSentence(str, word => isUpperCased(word));
};

export const detectLowerSentence = str => {
  return getWeightOfSentence(str, word => isLowerCased(word));
};