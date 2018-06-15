"use strict";

const Request = require("./request");

class RequestFactory {
  constructor(request) {
    this.request = request;
  }
  static createRequest() {
    const request = new Request();
    return request;
  }
}
module.exports = RequestFactory;
