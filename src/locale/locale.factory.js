'use strict';

const Locale = require('./locale');
const germanLocale = require('./de/de-DE.json');
const englishLocale = require('./en/en.json');

class LocaleFactory {
    static createLocales() {
        return {
            'de-DE': new Locale(germanLocale),
            'en': new Locale(englishLocale)
        }
    }
}
module.exports = LocaleFactory;
