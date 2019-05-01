/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
/*jshint latedef: false */
"use strict";

const promise = require("bluebird");
const utilities = require("./utilities");
const request = utilities.promisify(require("request"));
const mkdirp = utilities.promisify(require("mkdirp"));
const fs = require("fs");
const readFile = utilities.promisify(fs.readFile);
const writeFile = utilities.promisify(fs.writeFile);

const path = require("path");
const cmdConfig = require("./cmdconfig");
const validator = require("./validator");
const debug = require("debug")("spider");
debug.enabled = cmdConfig.get("debug", false);

function download(url, filename) {
    console.log("Downloading " + url);
    let body;
    return request(url).
    then(function(results) {
        body = results[1];
        return mkdirp(path.dirname(filename));
    }).
    then(function() {
        return writeFile(filename, body);
    }).
    then(function() {
        console.log("Downloaded and saved: " + url);
        return body;
    });
}

function spiderLinks(currentUrl,body,nesting) { 
	if( nesting === 0)
		return promise.resolve();
	const links = utilities.getPageLinks(currentUrl, body);
	const promises = links.map(function(link)
	{
		return spider( link, nesting - 1);
	});
	return promise.all(promises);
}

function spider( url, nesting) 
{ 
	const filename = utilities.urlToFilename(url); return readFile( filename, "utf8").
		then( function( body) 
			{ 
				return spiderLinks( url, body, nesting);}, 
			function( err) { 
				if( err.code !== "ENOENT") 
					throw err;
				return download(url,filename).then(function(body) 
					{ 
						return spiderLinks( url, body, nesting); 
					});
		}
	);
}

if (!validator.validate())
    process.exit();

spider(cmdConfig.get("url"),cmdConfig.get("nesting",1)).
	then( function() {
		console.log("Download complete"); }).catch( function( err) 
			{ console.log( err); 
}); 
