/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
"use strict";
const EventEmitter = require("events").EventEmitter;
const util = require("util");
const fs = require("fs");
const argc = process.argv.length;
let expression;
let finder;
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
                    match.forEach(function(elem) {
                        this.emit("found", file, elem);
                    });
            });
        });
        return this;
    };
function exitMessage() {
    console.error(
        "Usage: node proto.js 'regex' -{g}{i}{m}\ng - global,\ni - case-insensitive,\nm - multiline");
    process.exit(1);
}

function parseArgs(noOfArgs) {
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
}

if (argc > 2) {
    parseArgs(argc);
    finder = new FindPattern(expression);
  finder.on("fileread", function(file) {
                        console.log(file + " was read");
                    });
finder.on("found",
                        function(file, match) {
                            console.log("Matched '" + match + "' in file " + file);
                        });
  finder.on("error",function(err) {
                            console.log("Error emitted: " + err.message);});
    fs.readdir(
        ".",
        function(err, files) {
            if (err)
                console.log("Error reading directory: " + err.message);
            else {
                /**findPattern(files, /hello \w+/g)***/
                files.push("nonexistentfile.txt");
                finder.setFiles(files);
                finder.find();
            }
        });
} else
    exitMessage();

