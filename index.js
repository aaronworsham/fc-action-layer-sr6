'use strict';


module.exports.roll = roll;
const { DiceRoller } = require('rpg-dice-roller');
const diceRoller = new DiceRoller();

function roll(max){
	return diceRoller.roll('1d6');
}