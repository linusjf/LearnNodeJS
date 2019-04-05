"use strict";
var argc = process.argv.length;
var expression;

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

function exitMessage() {
  console.error(
      "Usage: node proto.js 'regularexpression' -[g][i][m]\ng - global,i - case-insensitive,m - multiline");
  process.exit(1);
}

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
      if (match = content.match(self.regex))
        match.forEach(function(elem) { self.emit('found', file, elem); });
    });
  });
  return this;
}

    function findPattern(files, regex) {
      var emitter = new EventEmitter();

      files.forEach(function(file) {
        fs.readFile(file, "utf8", function(err, content) {
          if (err)
            return emitter.emit("error", err);
          emitter.emit("fileread", file);
          var match = null;
          if (match = content.match(regex))
            match.forEach(function(
                elem) { emitter.emit("found", file, elem); });
        });
      });
      return emitter;
    }

    fs.readdir(".", function(err, files) {
      if (err)
        console.log("Error reading directory: " + err.message);
      else {
        var findPatternObject = new FindPattern(expression);
        findPatternObject.setFiles(files);
        findPatternObject.addFile('nonexistentfile.txt');
        findPatternObject.find()
            .on('found',
                function(file, match) {
                  console.log('Matched "' + match + '" in file ' + file);
                })
            .on('fileread',
                function(file) {
                  console.log('Read file ' + file);
                })
            .on('error',
                function(
                    err) { console.log('Error emitted ' + err.message); });
      }
    });
