'use strict';

class Randomizer {
    constructor() {}
    randomArrayElement(array) {
        let i = 0;
        i = Math.floor(Math.random() * array.length);
        return (array[i]);
    }
}
module.exports = Randomizer;
