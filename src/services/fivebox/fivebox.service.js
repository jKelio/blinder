"use strict";

class FiveBoxService {
    constructor(request, operationsResolver) {
        this.request = request;
        this.operationsResolver = operationsResolver;
    }

    fetchContent() {
        const operation = this.operationsResolver.resolveFetchContent();

        return this.request.doHttpFormCall(operation);
    }
}
module.exports = FiveBoxService;
