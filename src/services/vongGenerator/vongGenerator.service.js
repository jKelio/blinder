"use strict";

class VongGeneratorService {
    constructor(request, operationsResolver) {
        this.request = request;
        this.operationsResolver = operationsResolver;
    }

    fetchTranslatedVongText(text) {
        const operation = this.operationsResolver.resolveFetchTranslatedVongText();
        operation.body = {
            text: text
        };

        return this.request.doHttpFormCall(operation).then((body) => {
            return body.vong.substr(1, body.vong.length - 2);
        });
    }

    generateVongImageUrl(message) {
        const operation = this.operationsResolver.resolveFetchVongImage(message);

        return operation.url;
    }
}
module.exports = VongGeneratorService;
