'use strict';

var expect = require('chai').expect;
var actionLayer = require('../index');

describe('#rollDice', function() {
    it('should roll dice', function() {
        var result = actionLayer.roll(6);
        console.log(result);
        expect(result.rolls[0][0]).to.be.below(7);
    });
});