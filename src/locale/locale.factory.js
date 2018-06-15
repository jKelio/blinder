'use strict';

const Locale = require('./locale');
const germanLocale = require('./de/de-DE.json');

class LocaleFactory {
    static createLocales() {
        return {
            'de-DE': new Locale(germanLocale)
        }
    }
}
module.exports = LocaleFactory;
