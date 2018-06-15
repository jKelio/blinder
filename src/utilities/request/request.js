"use strict";

const request = require("request");

class Request {
  constructor() {}
  doHttpCall(operation) {
    const options = {
      url: operation.url,
      method: operation.method,
      json: true,
      strictSSL: true
    };
    // Add headers to request if neccessary
    if (operation.headers) {
      options.headers = operation.headers;
    }
    // Add request body for patch, post and put requests if neccessary
    if (
      (operation.method === "PATCH" ||
        operation.method === "POST" ||
        operation.method === "PUT") &&
      operation.body
    ) {
      options.body = operation.body;
    }
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          return reject(error);
        }
        resolve(body);
      });
    });
  }

  doHttpFormCall(operation) {
    return new Promise((resolve, reject) => {
      request.post(operation.url, { form: operation.body }, (error, response, body) => {
        if (error) {
          return reject(error);
        }
        resolve(JSON.parse(body));
      });
    });
  }
}
module.exports = Request;
