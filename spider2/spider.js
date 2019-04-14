"use strict";

const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

var filename;
var downloaded = false;
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
downloaded = true;
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
					return callback( err,filename,false); 
				} 
				return download( url, filename, function( err, body)
					{ 
						if( err) 
						{ 
							return callback( err,filename,false);
						} 
						spiderLinks( url, body, nesting, callback);
					});
			} 
		
			spiderLinks( url, body, nesting, callback);
}); 
} 

function spiderLinks( currentUrl, body, nesting, callback) {
	if( nesting <= 0) 
		return process.nextTick( callback,null,currentUrl,true);
	 
	var links = utilities.getPageLinks( currentUrl, body); 
	 
	function iterate( index) { 
		
		if( index === links.length) { return callback(null,filename,downloaded); } spider( links[ index], nesting - 1, function( err) { 
			
			if( err) { return callback( err); } iterate( index + 1); });

}
iterate( 0); 

//iterateAll(links,nesting,callback);
} 
function iterateAll(collection,nesting,finalCallback)
{

	function iterate( index) { 
		
		if( index === collection.length)
	return finalCallback();
 spider( collection[ index], nesting - 1, function( err) { 
			if( err)  
		 return finalCallback( err); 
  iterate( index + 1); 
 });

}
iterate(0);  
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
if (url )
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
{
	exitMessage();
}

function exitMessage()
{
    console.error('Usage: node spider.js url {level}.\nLevel defaults to 1.');
    process.exit(1);
}


