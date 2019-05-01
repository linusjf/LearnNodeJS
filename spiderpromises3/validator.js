/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
"use strict";
const validator = require("validator");
const cmdConfig = require("./cmdconfig");
const assert = require("assert");

function isURLEmpty(options) {
	try {
assert(options._all.url,"No url specified");
	}
	catch(err)
	{
		console.error(err.message);
		return 1;
	}
	return 0;
}

function isURLValid(options)
{
if (options._all.url)
	{
	try{
		assert(validator.isURL(options._all.url,{protocols:["http","https"],require_host: true, require_valid_protocol:true,require_protocols:true}),options._all.url + " is invalid.");
	}
	catch(err)
	{
		console.error(err.message);
		return 1;
	}
	}
	return 0;
}

function isNestingValid(options)
{
if (options._all.nesting !== undefined)
	{
		try {
		assert(validator.isInt(options._all.nesting.toString(),{gt:0}),"Nesting must be greater than 0");
		}
	catch(err)
	{
		console.error(err.message);
		return 1;
	}
	}
	return 0;
}


function isConcurrencyValid(options)
{
if (options._all.concurrency !== undefined)
	{
		try {
		assert(validator.isInt(options._all.concurrency+"",{gt:0}),"Concurency must be greater than 0");
		}
	catch(err)
	{
		console.error(err.message);
		return 1;
	}
	}
	return 0;
}

module.exports.validate = function()
{
	const options = cmdConfig.options;
	let assertCount = 0;
	assertCount += isURLEmpty(options) + isURLValid(options) + isNestingValid(options) + isConcurrencyValid(options);
	
	if (assertCount || options._all.help)
	{
		console.error(cmdConfig.usage);
		return false;
	}
	
	return true;
};

