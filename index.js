'use strict';


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
	updateCurrentRoll(diceRoll)
	updateCountHits(diceRoll, options);
	return diceRoll
}

function updateCountHits(diceRoll, options){
	var hits = 0;
	for (var i = diceRoll.currentRoll.length - 1; i >= 0; i--) {
		if (diceRoll.currentRoll[i] > options.threshold) {
			hits++
		}
	}
	diceRoll.hits = hits
}


function updateCurrentRoll(diceRoll){
	diceRoll.currentRoll = diceRoll.rolls[diceRoll.rolls.length- 1]
}

function reroll(rerollArray, diceRoll, options){
	var newRolls = diceRoller.roll(rerollArray.length + 'd6');
	var newRollArray = diceRoll.rolls[diceRoll.rolls.length -1].slice(0)
	var x = 0;
	for (var i in rerollArray){
		newRollArray[rerollArray[i]] = newRolls.rolls[0][i]
		x++;
	}
	diceRoll.rolls.push(newRollArray)
	updateCurrentRoll(diceRoll)
	updateCountHits(diceRoll, options)	

	return diceRoll;
}

function rollInit(options){
	var diceRoll = diceRoller.roll(options.poolSize + 'd6');
	return diceRoll
}

module.exports.rollForHits = rollForHits;
module.exports.reroll = reroll;
module.exports.rollInit = rollInit;
