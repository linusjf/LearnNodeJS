/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
'use strict';

function asyncFlowWithPromises(generatorFunction) {
    let generator, promise, next;
    function callback(result,err) {
        if (err)
        return generator.throw(err);
        const results = Array.prototype.slice.call(arguments, 1),
            next = generator.next(results.length > 1 ? results : results[0]);
  if (!next.done && (promise = next.value) && promise )
          promise.then(callback);
    }
    generator = generatorFunction();
    next = generator.next();
  if (!next.done && (promise = next.value) && promise )
      promise.then(callback);
}

function promisify(callbackBasedApi) {
        return function promisified() {
            const args = Array.prototype.slice.call(arguments);
          return new Promise(function(resolve, reject) { 
    args.push(function(err, result) {
                    if (err)
                        return reject(err);
                    if (arguments.length <= 2)
                        resolve(result);
                    else
                        resolve(Array.prototype.slice.call(arguments, 1));
                });
                callbackBasedApi.apply(null, args);
            });
        };
}

const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

asyncFlowWithPromises(function*() {
    const myself = yield readFile(__filename, 'utf8');
    yield writeFile("clone_of_asyncpromise.js", myself);
    console.log("Clone created");
});
