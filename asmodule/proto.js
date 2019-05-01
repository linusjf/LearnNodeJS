/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
"use strict";
const argc = process.argv.length;
let expression;

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

const fs = require("fs");
const finder = require("./find.js");

fs.readdir(".", function(err, files) {
  if (err)
    console.log("Error reading directory: " + err.message);
  else {
    let findPatternObject = new finder(expression);
    findPatternObject.setFiles(files);
    findPatternObject.addFile("nonexistentfile.txt");
    findPatternObject.find()
        .on("found",
            function(file, match) {
              console.log("Matched <" + match + "> in file " + file);
            })
        .on("fileread", function(file) { console.log("Read file " + file); })
        .on("error",
            function(err) { console.log("Error emitted " + err.message); });
  }
});
}
else
    exitMessage();
