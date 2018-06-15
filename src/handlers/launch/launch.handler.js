'use strict';

const Alexa = require('ask-sdk');

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

        const templateBackground = new Alexa.ImageHelper()
            .withDescription('Vong Duden - Dein Vong Translator')
            .addImageInstance('https://s3-eu-west-1.amazonaws.com/vong-duden/images/duden-1427114.jpg')
            .getImage();

        const templateImage = new Alexa.ImageHelper()
            .withDescription('Vong Duden - Dein Vong Translator')
            .addImageInstance('https: //s3-eu-west-1.amazonaws.com/vong-duden/images/logo_fanpage.png')
            .getImage();

        let response;

        return new Promise((resolve, reject) => {
            persistentAttributes.then((attributes) => {
                let welcomeSpeech = requestAttributes.t('WELCOME_AGAIN');
                let tutorialSpeech = requestAttributes.t('HELP');
                let outputSpeech = welcomeSpeech;

                if (!attributes['user']) {
                    attributes['user'] = session.user.userId;
                    welcomeSpeech = requestAttributes.t('WELCOME');
                    outputSpeech = welcomeSpeech + tutorialSpeech;
                }

                attributes['visitCounter'] = attributes['visitCounter'] || 0;
                attributes['visitCounter']++;

                response = responseBuilder
                    .speak(outputSpeech)
                    .reprompt(tutorialSpeech)
                    .withShouldEndSession(false);

                const templateTextContent = new Alexa.RichTextContentHelper()
                    .withPrimaryText(welcomeSpeech)
                    .getTextContent();

                if (this.supportsDisplay(handlerInput) || this.isSimulator(handlerInput)) {
                    console.log('device supports a disply');
                    response = response.addRenderTemplateDirective({
                        "type": "BodyTemplate6",
                        "token": "LAUNCH",
                        "backButton": "VISIBLE",
                        "backgroundImage": templateBackground,
                        "image": templateImage,
                        "textContent": templateTextContent
                    });
                }

                attributesManager.setPersistentAttributes(attributes);
                return handlerInput.attributesManager.savePersistentAttributes();
            }).then(() => {
                resolve(response.getResponse());
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
