/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  no-use-before-define */

const Alexa = require('ask-sdk');
const HandlersFactory = require('./src/handlers/handlers.factory');
const LocalizationInterceptorFactory = require('./src/interceptors/localization/localizationInterceptor.factory');

const skillBuilder = Alexa.SkillBuilders.standard();
const handlers = HandlersFactory.createHandlers();
const localizationInterceptor = LocalizationInterceptorFactory.createLocalizationInterceptor();
const errorHandler = HandlersFactory.createErrorHandler();
console.log('Handlers');
console.log(handlers);

exports.handler = skillBuilder
    .addRequestHandlers(
        ...handlers
    )
    .addRequestInterceptors(localizationInterceptor)
    .addErrorHandlers(errorHandler)
    .withTableName('VongDuden')
    .withAutoCreateTable(true)
    .lambda();
