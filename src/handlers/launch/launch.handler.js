'use strict';

const Alexa = require('ask-sdk');
const fiveBoxService = require('../../services/fivebox/fiveboxService.factory').createFiveBoxService();

class LaunchHandler {
    constructor() {}
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        console.log(request.type);

        return request.type === 'LaunchRequest';
    }
    handle(handlerInput) {
        const session = handlerInput.requestEnvelope.session;
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        const requestAttributes = attributesManager.getRequestAttributes();
        const persistentAttributes = attributesManager.getPersistentAttributes();

        let response;
        let isStreamOver = false;

        return new Promise((resolve, reject) => {
            persistentAttributes.then((attributes) => {
                let welcomeSpeech = requestAttributes.t('WELCOME_AGAIN');
                let outputSpeech = welcomeSpeech;

                if (!attributes['user']) {
                    attributes['user'] = session.user.userId;
                    attributes['listenedContent'] = [];
                    welcomeSpeech = requestAttributes.t('WELCOME');
                    outputSpeech = welcomeSpeech;
                }

                attributes['visitCounter'] = attributes['visitCounter'] || 0;
                attributes['visitCounter']++;

                fiveBoxService.fetchContent().then(body => {
                    for (let i = 0; i <= body.content.length; i++) {
                        const currentCurrent = body.content[i];
                        if (!currentCurrent) {
                            outputSpeech = requestAttributes.t('ENDSTREAM');
                            isStreamOver = true;
                            break;
                        }

                        const foundNumber = parseInt(attributes['listenedContent'].find(index => index === i));
                        if (!isNaN(foundNumber)) {
                            continue;
                        }

                        attributes['listenedContent'].push(i);
                        attributes['lastContent'] = currentCurrent;
                        outputSpeech += `<audio src='${currentCurrent.audio}' /></speak>`;
                        break;
                    }

                    attributesManager.setPersistentAttributes(attributes);
                    return handlerInput.attributesManager.savePersistentAttributes();
                }).then(() => {
                    response = responseBuilder
                        .speak(outputSpeech)
                        .withShouldEndSession(isStreamOver);
                    resolve(response.getResponse());
                });
            });
        }).catch(err => {
            console.log(err);
            throw err;
        });
    }

    supportsDisplay(handlerInput) {
        const hasDisplay =
            handlerInput.requestEnvelope.context &&
            handlerInput.requestEnvelope.context.System &&
            handlerInput.requestEnvelope.context.System.device &&
            handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
            handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
        return hasDisplay;
    }

    isSimulator(handlerInput) {
        const isSimulator = !handlerInput.requestEnvelope.context;
        return isSimulator;
    }
}
module.exports = LaunchHandler;
