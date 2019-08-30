'use strict';

var expect = require('chai').expect;
var actionLayer = require('../index');

describe('Pool of Dice', function() {
	describe('Standard Pool', function(){
    it('should roll a pool of 6 dice', function() {
    		var options = {explode: false, threshold: 4, poolSize: 6}
        var result = actionLayer.rollForHits(options);
        expect(result.rolls[0][0]).to.be.below(7);
        expect(result.rolls[0].length).to.equal(6)
    });	
     it('will have hits after 100 rolls', function(){
    	var diceRolled = 0;
			var options = {explode: false, threshold: 4, poolSize: 6}
    	for (var i = 100; i >= 0; i--) {
        var result = actionLayer.rollForHits(options);
    		diceRolled += result.hits
    	}
    	expect(diceRolled).to.be.above(0);
    })	
     it('will have a current roll array', function(){
        var options = {explode: false, threshold: 4, poolSize: 6}
        var result = actionLayer.rollForHits(options);
        expect(result.currentRoll).to.exist;
     })
	})
	describe('Exploding Pool', function(){
    it('should roll an exploding pool of 6 dice', function() {
    		var options = {explode: false, threshold: 4, poolSize: 6}
        var result = actionLayer.rollForHits(options);
        expect(result.rolls[0][0]).to.be.below(7);
        expect(result.rolls[0].length).to.be.above(5)
    });
    it('will explode after 100 rolls', function(){
    	var diceRolled = 0;
    	var options = {explode: false, threshold: 4, poolSize: 6}
    	for (var i = 100; i >= 0; i--) {
        var result = actionLayer.rollForHits(options);
    		diceRolled += result.rolls[0].length
    	}
    	expect(diceRolled).to.be.above(600);
    })	
	})
	describe('Rerolling dice in Pool', function(){
		it('will reroll all of the dice', function(){
  		var options = {explode: false, threshold: 4, poolSize: 6}
      var result = actionLayer.rollForHits(options);
			var newResult = actionLayer.reroll([0,1,2,3,4,5], result, options)
      expect(result.rolls[0]).to.not.equal(result.rolls[1])
      expect(result.rolls[0]).to.not.equal(result.currentRoll)
		})
	})
  describe('Roll init for actor', function(){
    it('will roll 3 dice and sum them up', function(){
      var options = {poolSize: 6, mode: 'sum'}
      var result = actionLayer.rollInit(options)
      expect(result.total).to.be.above(3)

    })
  })
});


