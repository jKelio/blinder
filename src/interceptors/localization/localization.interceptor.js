'use strict';

class LocalizationInterceptor {
    constructor(i18n, sprintf, locales) {
        this.i18n = i18n;
        this.sprintf = sprintf;
        this.locales = locales;
    }
    process(handlerInput) {
        const localizationClient = this.i18n.use(this.sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: this.sprintf.overloadTranslationOptionHandler,
            resources: this.locales,
            returnObjects: true,
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function(...args) {
            const fetchedLocalization = localizationClient.t(...args);
            if (!Array.isArray(fetchedLocalization))
                return fetchedLocalization;

            return fetchedLocalization[Math.floor(Math.random() * fetchedLocalization.length)];
        };
    }
}
module.exports = LocalizationInterceptor;