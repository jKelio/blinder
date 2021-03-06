'use strict';

const fiveBoxService = require('../../services/fivebox/fiveboxService.factory').createFiveBoxService();
const telegramBotService = require('../../services/telegrambot/telegramBotService.factory').createTelegramBotService();

class YesHandler {
    constructor() {}
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'PositiveIntent';
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
                const lastContent = attributes['lastContent'];
                let outputSpeech = requestAttributes.t('POSITIVE');

                fiveBoxService.fetchContent().then((body) => {
                    const promise1 = telegramBotService.postMessage(lastContent.message);

                    const promise2 = promise1.then((body) => {
                        console.log('Message Send Status: ', body);
                    }).catch((err) => {
                        const error = err;
                    });

                    promise2.then(() => {
                        for (let i = 0; i <= body.content.length; i++) {
                            const currentContent = body.content[i];
                            if (!currentContent) {
                                outputSpeech = requestAttributes.t('ENDSTREAM');
                                isStreamOver = true;
                                break;
                            }

                            const foundNumber = parseInt(attributes['listenedContent'].find(index => index === i));
                            if (!isNaN(foundNumber)) {
                                continue;
                            }

                            attributes['listenedContent'].push(i);
                            attributes['lastContent'] = currentContent;
                            outputSpeech += `<audio src='${currentContent.audio}' /></speak>`;
                            break;
                        }

                        attributesManager.setPersistentAttributes(attributes);
                        handlerInput.attributesManager.savePersistentAttributes();

                        response = responseBuilder
                            .speak(outputSpeech)
                            .withShouldEndSession(isStreamOver);
                        resolve(response.getResponse());
                    });
                });
            });
        });
    }
}
module.exports = YesHandler;
