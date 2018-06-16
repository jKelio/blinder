"use strict";

const serverConfig = require('../../config/servers.json');
const requestFactory = require("../../utilities/request/request.factory");
const operationsResolverFactory = require("../../operations/operationsResolver.factory");
const FiveBoxService = require("./fivebox.service");

class FiveBoxServiceFactory {
    static createFiveBoxService() {
        const request = requestFactory.createRequest();
        const operationsResolver = operationsResolverFactory.createOperationsResolver(
            serverConfig.FiveBox
        );
        const fiveBoxService = new FiveBoxService(
            request,
            operationsResolver
        );

        return fiveBoxService;
    }
}
module.exports = FiveBoxServiceFactory;
