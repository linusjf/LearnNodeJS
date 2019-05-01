/*jshint globalstrict: true*/
/*jshint node: true */

"use strict";
const fs = require("fs");
const files = process.argv.slice(2);
if (!files.length)
    console.log("Usage: node async.js <list of file names>");
let cache = {};
function consistentReadAsync(filename, callback) {
    if (cache[filename]) {
    process.nextTick(function() { callback(cache[filename]); });
  } else {
    fs.readFile(filename, "utf8", function(err, data) {
        if (err)
            callback(err);
        else
        {
        cache[filename] = data;
      callback(data);
        }
    });
  }
}

files.forEach(function(item) {

    consistentReadAsync(item,function(data){
    console.log(item + " : "+data);
  });
});
