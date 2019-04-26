/*jshint globalstrict: true*/
/*jshint node: true */

/*jshint globalstrict: true*/
/*jshint node: true */

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

function spider(url, callback) {
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
