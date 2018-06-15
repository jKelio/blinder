'use strict';

class StopHandler {
    constructor() {}
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' &&
            (request.intent.name === 'AMAZON.NoIntent' ||
                request.intent.name === 'AMAZON.CancelIntent' ||
                request.intent.name === 'AMAZON.StopIntent');
    }
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const requestAttributes = attributesManager.getRequestAttributes();
        const responseBuilder = handlerInput.responseBuilder;

        return responseBuilder
            .speak(requestAttributes.t('STOP'))
            .withShouldEndSession(true)
            .getResponse();
    }
}
module.exports = StopHandler;
