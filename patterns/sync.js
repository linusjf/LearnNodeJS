/*jshint globalstrict: true*/
/*jshint node: true */

"use strict";
const fs = require("fs"),
      files = process.argv.slice(2);
if (!files.length)
    console.log('Usage: node sync.js <list of file names>');
let cache = {};
function consistentReadSync( filename) {
    if( cache[ filename]) {
console.log('cached entry '+filename);
        return cache[ filename];
} else {
    cache[ filename] = fs.readFileSync( filename, 'utf8');
    return cache[ filename];
} }

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
