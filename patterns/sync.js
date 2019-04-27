/*jshint globalstrict: true*/
/*jshint node: true */

"use strict";
var fs = require("fs");
var files = process.argv.slice(2);
if (!files.length)
    console.log('Usage: node sync.js <list of file names>');
var cache = {};
function consistentReadSync( filename) {
    if( cache[ filename]) {
console.log('cached entry '+filename);
        return cache[ filename];
} else {
    cache[ filename] = fs.readFileSync( filename, 'utf8');
    return cache[ filename];
} }


/***var files = [ "one.txt", "two.txt", "three.txt", "four.txt", "two.txt", "three.txt", "nil.txt" ];
***/
files.forEach(function(item)
    {
        try{
        console.log(consistentReadSync(item));
        }
        catch (e)
        {
console.log(e.message);
        }
    });
