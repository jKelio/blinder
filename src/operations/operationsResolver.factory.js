'use strict';

const Operations = require('./operations');
const OperationsResolver = require('./operations.resolver');

class OperationsResolverFactory {
    constructor() {
    }
    static createOperationsResolver(server) {
        const operations = new Operations();
        const operationsResolver = new OperationsResolver(operations, server);
        return operationsResolver;
    }
}
module.exports = OperationsResolverFactory;
