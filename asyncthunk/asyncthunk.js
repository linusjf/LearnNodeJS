/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
'use strict';

function asyncFlowWithThunks(generatorFunction) {
    var generator, thunk;
    function callback(err) {
        if (err)
        return generator.throw(err);
        var results = Array.prototype.slice.call(arguments, 1),
            thunk = generator.next(results.length > 1 ? results : results[0]).value;
        if (thunk)
          thunk(callback);
    }
    generator = generatorFunction();
    thunk = generator.next().value;
    if (thunk)
      thunk(callback);
}

var fs = require('fs');

function readFileThunk(filename, options) {
    return function(callback) {
        fs.readFile(filename, options, callback);
    };
}

function writeFileThunk(filename, body) {
    return function(callback) {
        fs.writeFile(filename, body, callback);
    };
}


asyncFlowWithThunks(function*() {
    var myself = yield readFileThunk(__filename, 'utf8');
    yield writeFileThunk("clone_of_asyncthunk.js", myself);
    console.log("Clone created");
});
