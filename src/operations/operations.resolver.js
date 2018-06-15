"use strict";

const format = require("string-format");

class OperationsResolver {
  constructor(operations, server) {
    this.baseUrl = server.protocol + server.host + server.port + server.path;
    this.operations = operations;
  }

  resolveFetchTranslatedVongText() {
    const uri = this.operations["fetchTranslatedVongText"].uri;

    const method = this.operations["fetchTranslatedVongText"].method;
    const endpoint = format((this.baseUrl + uri), {
      subdomain: ""
    });

    return {
      url: endpoint,
      method: method
    };
  }

  resolveFetchVongImage(message) {
    const formattedUri = format(
      this.operations["fetchVongImage"].uri, {
        message: message
      }
    );

    const method = this.operations["fetchVongImage"].method;
    const endpoint = format((this.baseUrl + formattedUri), {
      subdomain: "img."
    });

    return {
      url: endpoint,
      method: method
    };
  }
}
module.exports = OperationsResolver;
