import Caser from './caser';
import * as utils from './utils';

const caserFacade = function (str) {
    return new Caser(str);
}
caserFacade.registerRule = Caser.registerRule;
caserFacade.registerRules = Caser.registerRules;
caserFacade.removeRule = Caser.removeRule;
caserFacade.utils = utils;

export default caserFacade;