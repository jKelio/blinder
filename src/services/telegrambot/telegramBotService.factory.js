"use strict";

const serverConfig = require('../../config/servers.json');
const requestFactory = require("../../utilities/request/request.factory");
const operationsResolverFactory = require("../../operations/operationsResolver.factory");
const TelegramBotService = require("./telegramBot.service");

class TelegramBotServiceFactory {
    static createTelegramBotService() {
        const request = requestFactory.createRequest();
        const operationsResolver = operationsResolverFactory.createOperationsResolver(
            serverConfig.TelegramBotServer
        );
        const telegramBotService = new TelegramBotService(
            request,
            operationsResolver
        );

        return telegramBotService;
    }
}
module.exports = TelegramBotServiceFactory;
