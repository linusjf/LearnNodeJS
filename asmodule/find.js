/*jshint globalstrict: true*/
/*jshint node: true */

"use strict";
const util = require("util");
const fs = require("fs");
const EventEmitter = require("events").EventEmitter;

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
  
  this.files.forEach(function(file) {
    fs.readFile(file, "utf8", function(err, content) {
      if (err)
        return this.emit("error", err);
      this.emit("fileread", file);
      let match = null;
      if (!!(match = content.match(this.regex)))
        match.forEach(function(elem) { this.emit("found", file, elem); });
    });
  });
  return this;
};

module.exports = FindPattern;
