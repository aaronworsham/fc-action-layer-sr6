'use strict';


module.exports.roll = roll;
var roller = require('rpg-dice-roller')

function roll(max){
	return Math.floor(Math.random() * Math.floor(max));
}