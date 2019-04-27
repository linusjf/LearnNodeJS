/*jshint globalstrict: true*/
/*jshint node: true */

"use strict";
var fs = require("fs");
var files = process.argv.slice(2);
if (!files.length)
    console.log('Usage: node unpredictable.js <list of file names>');
var cache = {};

function createFileReader(filename) {
    var listeners = [];
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

files.forEach(function(item){

createFileReader(item).onDataReady(function(data)
    {
        console.log(item + ' : ' + data);
        //... sometime
    });
});

