"use strict";

class Operations {
  constructor() {
    this.fetchContent = {
      method: "GET",
      uri: "/getContent2"
    };
    this.postMessage = {
      method: "GET",
      uri: "/sendMessage?message={message}"
    };
  }
}
module.exports = Operations;
