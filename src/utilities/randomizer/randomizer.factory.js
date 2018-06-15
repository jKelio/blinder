'use strict';

const Randomizer = require('./randomizer');

class RandomizerFactory {
    static createRandomizer() {
        const randomizer = new Randomizer();

        return randomizer;
    }
}
module.exports = RandomizerFactory;
