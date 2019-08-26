import Caser from './caser';
import * as utils from './utils';

const caserFacade = function (str) {
    return new Caser(str);
};
caserFacade.addRule = Caser.addRule;
caserFacade.addRules = Caser.addRules;
caserFacade.removeRule = Caser.removeRule;
caserFacade.utils = utils;

export default caserFacade;