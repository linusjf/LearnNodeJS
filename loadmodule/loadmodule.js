/*jshint globalstrict: true*/
/*jshint node: true */

"use strict";
var fs = require('fs');
var req = require;
function loadModule(filename, module, require) {
  var wrappedSrc = '( function( module, exports, require) {' +
                   fs.readFileSync(filename, 'utf8') +
                   '})( module, module.exports, require);';
  eval(wrappedSrc); //jshint ignore:line
}

var require = function(moduleName) {
  console.log('Require invoked for module: ' + moduleName);
  var id = require.resolve(moduleName);
  //[ 1]
  if (require.cache[id]) {
    //[ 2]
    return require.cache[id].exports;
  }
  // module metadata
  var module = {
    //[ 3]
    exports : {},
    id : id
  };
  // Update the cache
  require.cache[id] = module;
  //[ 4]
  // load the module
  loadModule(id, module, require);
  //[ 5]
  // return exported variables
  return module.exports;
  //[ 6]
};
require.cache = {};
require.resolve =
    function(moduleName) {
  /* resolve a full module id fromthe moduleName */
  if (moduleName.startsWith('./')) {
    if (moduleName.indexOf('.js'))
      return moduleName;
    return moduleName + '.js';
  }
  return req.resolve(moduleName);
};

// load another dependency
var dependency = require('./anothermodule.js');
// a private function
function log() { console.log('Well done ' + dependency.username); }
// the API to be exported for public use
module.exports.run = function() { log(); };
