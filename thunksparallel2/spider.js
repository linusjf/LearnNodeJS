/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
/* jshint latedef:false */
"use strict";
const thunkify = require('thunkify');
const co = require('co');
const request = thunkify(require('request'));
const fs = require('fs');
const mkdirp = thunkify(require('mkdirp'));
const readFile = thunkify(fs.readFile);
const writeFile = thunkify(fs.writeFile);
const nextTick = thunkify(process.nextTick);
const utilities = require('./utilities');
const path = require('path');

const cmdConfig = require('./cmdconfig');
const validator = require('./validator');
const debug = require('debug')('spider');
debug.enabled = cmdConfig.get('debug', false);
const spidering = new Map();

function* download(url, filename) {
    console.log('Downloading ' + url);
    let results = yield request(url);
    let body = results[1];
    yield mkdirp(path.dirname(filename));
    yield writeFile(filename, body);
    console.log('Downloaded and saved:' + url);
    return body;
}

function* spider(url, nesting) {
  if(spidering.has(url)) {
    return nextTick();
  }
  spidering.set(url, true);  
  
  const filename = utilities.urlToFilename(url);
    let body;

    try {
        body = yield readFile(filename, 'utf8');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
        body = yield download(url, filename);
    }
    yield spiderLinks(url, body, nesting);
}

if (!validator.validate())
    process.exit();

co(function*() {
    try {
        yield spider(cmdConfig.get('url'), cmdConfig.get('nesting', 1));
        console.log('Download  complete');
    } catch (err) {
      debug(err);
      console.log(err);
    }
});

function spiderLinks(currentUrl, body, nesting) {
    if (nesting === 0) {
        return nextTick();
    }
    // returns a thunk
    return function(callback) {
        let completed = 0,
            errored = false;
        let links = utilities.getPageLinks(currentUrl, body);
        if (links.length === 0) 
            return process.nextTick(callback);

        function done(err, result) // jshint ignore: line 
        {
            if (err && !errored) {
                errored = true;
              debug('errored = '+errored);
                callback(err);
            }
            if (++completed === links.length && !errored) 
          callback();
        }
        for (let i = 0; i < links.length; i++)    co(spider(links[i], nesting - 1)).then(done);
    }; // end thunk
}
