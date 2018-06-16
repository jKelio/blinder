"use strict";

class TelegramBotService {
    constructor(request, operationsResolver) {
        this.request = request;
        this.operationsResolver = operationsResolver;
    }

    postMessage(message) {
        const operation = this.operationsResolver.resolvePostMessage(message);

        return this.request.doHttpFormCall(operation);
    }
}
module.exports = TelegramBotService;
