'use strict';

class ErrorHandler {
    constructor() {}
    canHandle() {
        return true;
    }
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;
        const attributesManager = handlerInput.attributesManager;
        const requestAttributes = attributesManager.getRequestAttributes();

        console.log(`Error handled: ${error.message}`);
        console.log(` Original request was ${JSON.stringify(request, null, 2)}\n`);

        return handlerInput.responseBuilder
            .speak(requestAttributes.t('ERROR'))
            .reprompt(requestAttributes.t('ERROR'))
            .getResponse();
    }
}
module.exports = ErrorHandler;
