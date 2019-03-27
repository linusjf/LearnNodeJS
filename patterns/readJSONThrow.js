var fs = require('fs');
function readJSON(filename, callback) {
  fs.readFile(filename, 'utf8', function(err, data) {
    var parsed;
    if (err)
      // propagate the error and exit the current function
      callback(filename + ' : '+err);
    else
    {
      // parse the file contents
        parsed = JSON.parse(data);
        // catch parsing errors
    // no errors, propagate just the data
    callback(filename + ' : '+JSON.stringify(parsed));} });
};

var files = process.argv.slice(2);
if (!files.length)
{
    console.log('Usage: node readJSON.js <list of file names>');
    process.exit(1);
}

process.on('uncaughtException', function( err){ 
    console.error('Caught JSON parsing exception ' + err.name + ' : ' +err.message); 
    // without this, the application would continue 
    process.exit(1);
});

files.forEach((item) => {
readJSON(item,(data) => {
    console.log(data);
    });
});
