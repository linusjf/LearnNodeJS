/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
"use strict";
var argc = process.argv.length;
var expression;

function exitMessage() {
  console.error(
      "Usage: node proto.js 'regex' -{g}{i}{m}\ng - global,\ni - case-insensitive,\nm - multiline");
  process.exit(1);
}

function parseArgs(noOfArgs) {
  if (noOfArgs > 2) {
    let xpr = process.argv[2];
    if (noOfArgs > 3) {

      let options = process.argv[3];
      let pattern = new RegExp("^-(?=[gim]{1,3}$)(?!.*(.).*\\1).*$");
      if (!pattern.test(options))
        exitMessage();
      else
        expression = new RegExp(xpr, options.substring(1));
    } else
      expression = new RegExp(xpr);

  } else
    exitMessage();
}

parseArgs(argc);


var EventEmitter = require("events").EventEmitter;
var util = require("util");
var fs = require("fs");

function FindPattern(regex) {
  EventEmitter.call(this);
  this.regex = regex;
  this.files = [];
}

util.inherits(FindPattern, EventEmitter);

FindPattern.prototype.addFile = function(file) {
  this.files.push(file);
  return this;
};

FindPattern.prototype.setFiles = function(files) {
  this.files = files;
  return this;
};

FindPattern.prototype.find =
    function() {
  var self = this;
  self.files.forEach(function(file) {
    fs.readFile(file, 'utf8', function(err, content) {
      if (err)
        return self.emit('error', err);
      self.emit('fileread', file);
      var match = null;
      if (!!(match = content.match(self.regex)))
        match.forEach(function(elem) { self.emit('found', file, elem); });
    });
  });
  return this;
};

