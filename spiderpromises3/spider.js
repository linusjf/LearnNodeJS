/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
/*jshint latedef:false */
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
const TaskQueue = require("./taskQueue");

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

function spiderLinks( currentUrl, body, nesting) 
{ 
	if( nesting === 0) 
		return promise.resolve();
	const links = utilities.getPageLinks( currentUrl, body);
// we need the following because the Promise we create next will never settle if there are no tasks to process 
console.log("links = "+links.length);
  if( links.length === 0) 
		return promise.resolve();
let downloadQueue = new TaskQueue(cmdConfig.get("concurrency",2));
debug(downloadQueue.concurrency);

	return new promise( function( resolve, reject) 
	{ 
		let completed = 0;
		links.forEach( function( link) { 
			const task = function() {
	return spider( link, nesting - 1).
		then( function() { 
      debug("completed = "+completed);
			if( ++completed === links.length) { 
      debug("Calling resolve");
        resolve(); } 
		}).catch( reject); };
      downloadQueue.pushTask( task); });
	});
} 

function spider( url, nesting) 
{ 
	const filename = utilities.urlToFilename(url); 
	return readFile( filename, "utf8").
		then( function( body) 
			{ 
        debug("File "+filename+" found");
				return spiderLinks( url, body, nesting);}, 
			function( err) { 
				if( err.code !== "ENOENT") 
					throw err;
				return download(url,filename).
	then(function(body) 
		{ 					return spiderLinks( url, body, nesting); 
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
