/*jshint globalstrict: true*/
/*jshint node: true */

/*jshint globalstrict: true*/
/*jshint node: true */

"use strict";
var Promise = require('bluebird');
var utilities = require('./utilities');
var request = utilities.promisify(require('request'));
var mkdirp = utilities.promisify(require('mkdirp'));
var fs = require('fs');
var readFile = utilities.promisify(fs.readFile);
var writeFile = utilities.promisify(fs.writeFile);

console.log(writeFile.toString());


