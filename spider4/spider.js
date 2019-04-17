"use strict";
const http = require('http');
const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');
const debug = require('debug')('spider');
debug.enabled = true;
var downloaded = false;
var spidering  = new Map();
/**var running = 0;
var allLinks = new Array();
var index = 0;**/
function saveFile(filename,body,callback)
{
        mkdirp(path.dirname(filename), err => {
            if (err)
              return callback(err);
            fs.writeFile(filename, body, err => {
                if (err)
                  return callback(err);
             return callback(null, filename, true);
});
    });
}

function download(url,filename,callback)
{
      console.log(`Downloading ${url} to ${filename}`);
      request(url, (err, response, body) => {       if (err)
          return callback(err);
    saveFile(filename,body,err => {
    console.log("Downloaded and saved " + url)+ " to ${filename}";
    if (err)
        return callback(err);
        callback(null,body);
    })
 });
downloaded = true;
}

function spider( url, nesting, callback) 
{ 
  /**let clearIntvl = true;
	let clearIntvl1 = true;**/
	if (spidering.has(url))
		return process.nextTick(callback);
	spidering.set(url,true);
	const filename = utilities.urlToFilename( url);
	fs.readFile( filename, 'utf8', function( err, body) { 
			if (err) {
			if (err.code !== 'ENOENT') 
				return callback( err,filename,false);
		return download( url, filename, function( err, body)		{ 
			if( err) 
				return callback( err,filename,false);
	/**var idVar = setInterval(() => {**/
				spiderLinks( url, body, nesting, callback);
		
				});
			}
		  
	/**var idVar1 = setInterval(() => {**/
				spiderLinks( url, body, nesting, callback);
	

	});
}
 

function spiderLinks( currentUrl, body, nesting, callback/**,redo**/) {
	if( nesting <= 0) 
		return process.nextTick( callback,null,currentUrl,downloaded);
	 
	var links = utilities.getPageLinks( currentUrl, body);
debug(links.length);
//	debug(currentUrl);
if (links.length === 0)
	return process.nextTick(callback,null,currentUrl,downloaded);
let completed = 0;
let running = 0;
let index = 0;
let inError = false;
//allLinks = allLinks.concat(links);
function next() {
	debug('index = '+index);
	debug('running = '+running);
	debug(links.length);
	while( running < concurrency && index < links.length) {
		const link = links[index++];

		spider(link,nesting-1, function() {
			debug('completed = '+completed);
			if( completed === links.length) 
				return done();
			completed++, running--; 
			next();
		}); 
		running++; 
	} 
if( completed === links.length) 
	return done();
} 
next();

	function done( err) 
	{ 
		if( err) 
		{ 
			inError = true; 
			return callback( err);
		} 
		debug('Into done: callback');
		return callback(null,url,downloaded);
	}
}


let url = process.argv[2];
var level;
if (process.argv[3])
{
	level = parseInt(process.argv[3]);
 
if (isNaN(level) || level <= 0)
	exitMessage();
}
else
	level = 1;
var concurrency;
if (process.argv[4])
{
	concurrency = parseInt(process.argv[4]);
 
	if (isNaN(level) || concurrency <= 0)
		exitMessage();
}
else
	concurrency = 2;
//http.globalAgent.maxSockets = concurrency;
if (url)
{
	spider(url, level,(err, filename, downloaded) => {
		
  if (err) {
    console.log(err);

  } else if (downloaded) {
    console.log(`Completed the download of "${url}"`);

  } else {
    console.log(`"${url}" has already been downloaded`);
  }
});
}
else
	exitMessage();


function exitMessage()
{
    console.error('Usage: node spider.js url {level} {concurrency}.\nLevel defaults to 1.\nConcurrency defaults to 2.');
    process.exit(1);
}


