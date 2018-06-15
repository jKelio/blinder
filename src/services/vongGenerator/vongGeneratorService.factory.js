"use strict";

const serverConfig = require('../../config/servers.json');
const requestFactory = require("../../utilities/request/request.factory");
const operationsResolverFactory = require("../../operations/operationsResolver.factory");
const VongGeneratorService = require("./vongGenerator.service");

class VongGeneratorServiceFactory {
    static createVongGeneratorService() {
        const request = requestFactory.createRequest();
        const operationsResolver = operationsResolverFactory.createOperationsResolver(
            serverConfig.VongGenerator
        );
        const vongGeneratorService = new VongGeneratorService(
            request,
            operationsResolver
        );

        return vongGeneratorService;
    }
}
module.exports = VongGeneratorServiceFactory;
