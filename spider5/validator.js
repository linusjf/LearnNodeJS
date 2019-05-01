/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
"use strict";
const validator = require("validator");
const cmdConfig = require("./cmdconfig");
const assert = require("assert");

<<<<<<< HEAD
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
assert(options._all.url,"No url specified");
	}
	catch(err)
	{
		inc();
		console.error(err.message);
	}
	if (options._all.url)
	{
	try{
		assert(validator.isURL(options._all.url,{protocols:["http","https"],require_host: true, require_valid_protocol:true,require_protocols:true}),options._all.url + " is invalid.");
	}
	catch(err)
	{
		inc();
		console.error(err.message);
	}
	}
	if (options._all.concurrency !== undefined)
		try
	{
		assert(validator.isInt(options._all.concurrency.toString(),{min:1}),"Concurrency must be greater than 0");
	}
	catch(err)
	{
		inc();
		console.error(err.message);
	}

		if (options._all.nesting !== undefined)
	{
		try {
		assert(validator.isInt(options._all.nesting.toString(),{gt:0}),"Nesting must be greater than 0");
		}
	catch(err)
	{
		inc();
		console.error(err.message);
	}
	}
=======
module.exports.validate = function() {
    const options = cmdConfig.options;
    let errors = [];
    errors = validateEmptyURL(options._all.url, errors);
    errors = validateURLFormat(options._all.url, errors);
    errors = validateConcurrency(options._all.concurrency, errors);
    errors = validateNesting(options._all.nesting, errors);
    return errors;
};

function validateEmptyURL(url, errors) {
    try {
        assert(url, "No url specified");
    } catch (err) {
        errors.push(err.message);
    }
    return errors;
}
>>>>>>> development

function validateURLFormat(url, errors) {
    if (url) {
        try {
            assert(validator.isURL(url, {
                protocols: ["http", "https"],
                require_host: true,
                require_valid_protocol: true,
                require_protocols: true
            }), url + " is invalid.");
        } catch (err) {
            errors.push(err.message);
        }
    }
    return errors;
}

function validateConcurrency(concurrency, errors) {
    if (concurrency !== undefined) {
        try {
            assert(validator.isInt(concurrency.toString(), {
                min: 1
            }), "Concurrency must be greater than 0");
        } catch (err) {
            errors.push(err.message);
        }
    }
    return errors;
}

function validateNesting(nesting, errors) {
    if (nesting !== undefined) {
        try {
            assert(validator.isInt(nesting.toString(), {
                gt: 0
            }), "Nesting must be greater than 0");
        } catch (err) {
            errors.push(err.message);
        }
    }
    return errors;
}
