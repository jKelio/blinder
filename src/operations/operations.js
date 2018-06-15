"use strict";

class Operations {
  constructor() {
    this.fetchTranslatedVongText = {
      method: "POST",
      uri: "/generate"
    };
    this.fetchVongImage = {
      method: "GET",
      uri: "/?message={message}"
    };
  }
}
module.exports = Operations;
