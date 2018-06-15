'use strict';

class YesHandler {
    constructor() {}
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent';
    }
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();

        return responseBuilder
            .speak(requestAttributes.t('TRANSLATE_AGAIN'))
            .reprompt(requestAttributes.t('HELP'))
            .withShouldEndSession(false)
            .getResponse();
    }
}
module.exports = YesHandler;
