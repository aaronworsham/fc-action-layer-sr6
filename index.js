'use strict';

module.exports.rollForHits = rollForHits;
module.exports.reroll = reroll;
const { DiceRoller } = require('rpg-dice-roller');
const diceRoller = new DiceRoller();

function rollForHits(options){
	/*
	options
		.threshold - number to judge hits by
		.explode - does it explode on 6, default is false
	*/

	var diceRoll
	if (options.explode) {
		diceRoll = diceRoller.roll(options.poolSize + 'd6!');
	}
	else{
		diceRoll = diceRoller.roll(options.poolSize + 'd6');
	}
	diceRoll.hits = countHits(diceRoll, options);
	return diceRoll
}

function countHits(diceRoll, options){
	var hits = 0;
	for (var i = diceRoll.rolls[0].length - 1; i >= 0; i--) {
		if (diceRoll.rolls[0][i] > options.threshold) {
			hits++
		}
	}
	return hits
}

function reroll(rerollArray, diceRoll){
	var newRolls = diceRoller.roll(rerollArray.length + 'd6');
	var x = 0;
	for (var i in rerollArray){
		console.log("Updating " + diceRoll.rolls[0][rerollArray[i]] + " to " + newRolls.rolls[0][x])
		diceRoll.rolls[0][rerollArray[i]] = newRolls.rolls[0][i]
		x++;
	}
	return diceRoll;
}
