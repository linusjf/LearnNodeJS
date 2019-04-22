const validator = require('validator');
const cmdConfig = require('./cmdconfig');
const assert = require('assert');

module.exports.validate = function()
{
	const options = cmdConfig.options;
	let assertCount = 0;
	function inc()
	{
		assertCount++;
		return assertCount;
	}
	try{
assert(options._all.url,'No url specified');
	}
	catch(err)
	{
		inc();
		console.error(err.message);
	}
	if (options._all.url)
	{
	try{
		assert(validator.isURL(options._all.url,{protocols:['http','https'],require_host: true, require_valid_protocol:true,require_protocols:true}),options._all.url + ' is invalid.');
	}
	catch(err)
	{
		inc();
		console.error(err.message);
	}
	}

		if (options._all.nesting !== undefined)
	{
		try {
		assert(validator.isInt(options._all.nesting.toString(),{gt:0}),'Nesting must be greater than 0');
		}
	catch(err)
	{
		inc();
		console.error(err.message);
	}
	}

			if (assertCount || options._all.help)
	{
		console.error(cmdConfig.usage);
		return false;
	}
	
	return true;
}
