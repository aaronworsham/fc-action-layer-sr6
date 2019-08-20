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
		it('will reroll one of the dice', function(){
  		var options = {explode: false, threshold: 4, poolSize: 6}
      var result = actionLayer.rollForHits(options);
      var oldResult = result.rolls[0].slice(0)  //clone the value of the array
      console.log(oldResult)
			var newResult = actionLayer.reroll([0], result)		
			console.log(newResult);
			console.log(result);
		});
		it('will reroll three of the dice', function(){
  		var options = {explode: false, threshold: 4, poolSize: 6}
      var result = actionLayer.rollForHits(options);
      var oldResult = result.rolls[0].slice(0)  //clone the value of the array
      console.log(oldResult)
			var newResult = actionLayer.reroll([0,2,4], result)		
			console.log(newResult);
			console.log(result);
		})
	})
});


