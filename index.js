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
	console.log('Before rolling new Roll')
	console.log(diceRoll.rolls)
	var newRolls = diceRoller.roll(rerollArray.length + 'd6');
	var newRollArray = diceRoll.rolls[diceRoll.rolls.length -1].slice(0)
	var x = 0;
	for (var i in rerollArray){
		console.log("Updating " + newRollArray[rerollArray[i]] + " to " + newRolls.rolls[0][x])
		newRollArray[rerollArray[i]] = newRolls.rolls[0][i]
		x++;
	}

	console.log('Before adding new Roll')
	console.log(diceRoll.rolls)
	diceRoll.rolls.push(newRollArray)
	console.log('After adding new Roll')
	console.log(diceRoll.rolls)

	console.log('Before updating Current')
	console.log(diceRoll.currentRoll)
	updateCurrentRoll(diceRoll)
	console.log('After updating Current')
	console.log(diceRoll.currentRoll)

	console.log('Before updating Hits')
	console.log(diceRoll.hits)
	updateCountHits(diceRoll, options)
	console.log(diceRoll.hits)
	

	return diceRoll;
}
