'use strict';

var expect = require('chai').expect;
var actionLayer = require('../index');

describe('#rollDice', function() {
    it('should roll dice', function() {
        var result = actionLayer.roll(6);
        expect(result).to.be.below(7);
    });
});