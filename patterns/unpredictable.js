/*jshint globalstrict: true*/
/*jshint node: true */
"use strict";
const fs = require("fs"),
      files = process.argv.slice(2);
if (!files.length)
    console.log('Usage: node unpredictable.js <list of file names>');
let cache = {};

function inconsistentRead(filename, callback) {
    if (cache[filename]) {
        callback(cache[filename]);
    } else {
        fs.readFile(filename, "utf8", function(err, data) {
            if (err) {
                callback(err);
            } else {
                cache[filename] = data;
                callback(data);
            }
        });
    }
}

function createFileReader(filename) {
    let listeners = [];
    inconsistentRead(filename, function(value) {
        listeners.forEach(function(listener) {
            listener(value);
        });
    });
    return {
        onDataReady: function(listener) {
            listeners.push(listener);
        }
    };
}


files.forEach(function(item){

createFileReader(item).onDataReady(function(data)
    {
        console.log(item + ' : ' + data);
        //... sometime
    });
});

