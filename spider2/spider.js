"use strict";

const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

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
      console.log(`Downloading ${url}`);
      request(url, (err, response, body) => { //[2]
        if (err)
          return callback(err);
    saveFile(filename,body,err => {
    console.log("Downloaded and saved " + url);
    if (err)
        return callback(err);
        callback(null,body);
    })
 });

}

function spider( url, nesting, callback) 
{ 
	var filename = utilities.urlToFilename( url);
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
	if( nesting === 0) 
	{ 
		return process.nextTick( callback);
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

/**function spider(url, callback) {
  const filename = utilities.urlToFilename(url);
  fs.exists(filename, exists => { //[1]
    if (exists)
        return callback(null, filename, false);
    download(url,filename,err => {
    if (err)
        return callback(err);
    return callback(null,filename,true);
    })
});
}
**/
if (process.argv[2])
{
spider(process.argv[2], (err, filename, downloaded) => {
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
    console.error('Usage: node spider.js url');
    process.exit(1);
}
