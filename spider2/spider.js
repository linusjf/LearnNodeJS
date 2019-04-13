"use strict";

const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

var filename;
function saveFile(filename,body,callback)
{
	console.log(filename);
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
      request(url, (err, response, body) => { //[2]
        if (err)
          return callback(err);
    saveFile(filename,body,err => {
    console.log("Downloaded and saved " + url)+ " to ${filename}";
    if (err)
        return callback(err);
        callback(null,body);
    })
 });

}

function spider( url, nesting, callback) 
{ 
	filename = utilities.urlToFilename( url);
	fs.readFile( filename, 'utf8', function( err, body) 
		{ 
			if( err) 
			{ 
				if( err.code !== 'ENOENT') 
				{ 
					return callback( err); 
				} 
				return download( url, filename, function( err, body)
					{ 
						if( err) 
						{ 
							return callback( err);
						} 
						spiderLinks( url, body, nesting, callback);
					});
			} 
			spiderLinks( url, body, nesting, callback);
}); 
} 

function spiderLinks( currentUrl, body, nesting, callback) {
	if( nesting <= 0) 
	{
		console.log(filename);
		return process.nextTick( callback,null,filename,false);
	} 
	var links = utilities.getPageLinks( currentUrl, body); 
	//[ 1] 
	function iterate( index) { 
		//[ 2]
		if( index === links.length) { return callback(); } spider( links[ index], nesting - 1, function( err) { 
			//[ 3]
			if( err) { return callback( err); } iterate( index + 1); });

}
iterate( 0); //[ 4] 
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
	level = 10;

if (url )
{
	spider(process.argv[2], level,(err, filename, downloaded) => {
  if (err) {
    console.log(err);

  } else if (downloaded) {
    console.log(`Completed the download of "${filename}"`);

  } else {
    console.log(`"${filename}" was already downloaded`);
  }
});
}
else
{
	exitMessage();
}

function exitMessage()
{
    console.error('Usage: node spider.js url {level}.\nLevel defaults to 10.');
    process.exit(1);
}


