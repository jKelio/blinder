'use strict';

const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const LocaleFactory = require('../../locale/locale.factory');
const LocalizationInterceptor = require('./localization.interceptor');

class LocalizationInterceptorFactory {
    static createLocalizationInterceptor() {
        const locales = LocaleFactory.createLocales();
        const localizationInterceptor = new LocalizationInterceptor(i18n, sprintf, locales);

        return localizationInterceptor;
    }
}
module.exports = LocalizationInterceptorFactory;
