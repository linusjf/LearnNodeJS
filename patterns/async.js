/*jshint globalstrict: true*/
/*jshint node: true */

"use strict";
var fs = require("fs");
var files = process.argv.slice(2);
if (!files.length)
    console.log('Usage: node async.js <list of file names>');
var cache = {};
function consistentReadAsync(filename, callback) {
    if (cache[filename]) {
    process.nextTick(function() { callback(cache[filename]); });
  //  setImmediate(function() { callback(cache[filename]); });
  } else {
    // asynchronous function
    fs.readFile(filename, 'utf8', function(err, data) {
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

/***var files = [
  "one.txt", "two.txt", "three.txt", "four.txt", "two.txt", "three.txt",
  "nil.txt"
];***/

files.forEach(function(item) {

    consistentReadAsync(item,function(data){
    console.log(item + ' : '+data);
  });
});
