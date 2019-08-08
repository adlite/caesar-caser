import Caser from './caser';

const caserFacade = function (str) {
    return new Caser(str);
}
caserFacade.registerRule = Caser.registerRule;
caserFacade.registerRules = Caser.registerRules;
caserFacade.removeRule = Caser.removeRule;

export default caserFacade;