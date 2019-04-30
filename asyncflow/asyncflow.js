/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
'use strict';

function asyncFlow(generatorFunction) {
  let generator;  
  function callback(err) {
        if (err) {
            return generator.throw(err);
        }
        const results = Array.prototype.slice.call(arguments, 1);
        generator.next(results.length > 1 ? results : results[0]);
    }
    generator = generatorFunction(callback);
    generator.next();
}

const fs = require('fs'),
      path = require('path');


asyncFlow(function*(callback) {
    const fileName = path.basename(__filename);
    const myself = yield fs.readFile(fileName, 'utf8', callback);
  yield fs.writeFile('clone_of_' + fileName, myself, callback);
    console.log('Clone created');
});
