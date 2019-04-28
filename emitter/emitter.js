/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */

"use strict";
var argc = process.argv.length;
var expression;

function exitMessage() {
  console.error(
      "Usage: node emitter.js 'regex' -{g}{i}{m}\ng - global,\ni - case-insensitive,\nm - multiline");
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

var fs = require("fs");

function findPattern(files, regex) {
  var emitter = new EventEmitter();

  files.forEach(function(file) {
    fs.readFile(file, "utf8", function(err, content) {
      if (err)
        return emitter.emit("error", err);
      emitter.emit("fileread", file);
      var match = null;
      if (!!(match = content.match(regex)))
        match.forEach(function(elem) { emitter.emit("found", file, elem); });
    });
  });
  return emitter;
}

fs.readdir(
    ".", function(err, files)

    {
      if (err)
        console.log("Error reading directory: " + err.message);
      else

      {
        /**findPattern(files, /hello \w+/g)***/
        files.push('nonexistentfile.txt');
        findPattern(files, expression)
            .on('fileread', function(file) { console.log(file + ' was read'); })
            .on('found',
                function(file, match) {
                  console.log('Matched "' + match + '" in file ' + file);
                })
            .on('error',
                function(
                    err) { console.log('Error emitted: ' + err.message); });
      }
    });
