"use strict";

const format = require("string-format");

class OperationsResolver {
  constructor(operations, server) {
    this.baseUrl = server.protocol + server.host + server.port + server.path;
    this.operations = operations;
  }

  resolveFetchContent() {
    const uri = this.operations["fetchContent"].uri;

    const method = this.operations["fetchContent"].method;
    const endpoint = this.baseUrl + uri;

    return {
      url: endpoint,
      method: method
    };
  }

  resolvePostMessage(message) {
    const uri = format(this.operations["postMessage"].uri, {
      message: message
    });

    const method = this.operations["postMessage"].method;
    const endpoint = this.baseUrl + uri;

    return {
      url: endpoint,
      method: method
    };
  }
}
module.exports = OperationsResolver;
