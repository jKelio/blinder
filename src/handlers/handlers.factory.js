'use strict';

/**
 * Import all handlers with configured alexa intents
 */
const LaunchHandler = require('./launch/launch.handler');
const HelpHandler = require('./help/help.handler');
const YesHandler = require('./yes/yes.handler');
const StopHandler = require('./stop/stop.handler');
const SessionEndedHandler = require('./sessionEnded/sessionEnded.handler');

/**
 * Import all error handlers
 */
const ErrorHandler = require('./error/error.handler');

class HandlersFactory {
    static createHandlers() {
        const handlers = new Array();

        handlers.push(new LaunchHandler());
        handlers.push(new HelpHandler());
        handlers.push(new YesHandler());
        handlers.push(new StopHandler());
        handlers.push(new SessionEndedHandler());

        return handlers;
    }

    static createErrorHandler() {
        const errorHandler = new ErrorHandler();

        return errorHandler;
    }
}
module.exports = HandlersFactory;
