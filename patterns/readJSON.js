var fs = require('fs');
function readJSON(filename, callback) {
  fs.readFile(filename, 'utf8', function(err, data) {
    var parsed;
    if (err)
      // propagate the error and exit the current function
      callback(filename + ' : '+err);
      try {
        // parse the file contents
        parsed = JSON.parse(data);
      } catch (err) {
        // catch parsing errors
        callback(filename + ' : '+err.message);
      } 
    // no errors, propagate just the data
    callback(filename + ' : '+JSON.stringify(parsed)); });
};

var files = process.argv.slice(2);
if (!files.length)
    console.log('Usage: node readJSON.js <list of file names>');

files.forEach((item) => {
readJSON(item,(data) => {
    console.log(data);
    });
});
