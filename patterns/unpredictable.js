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
//    console.log('before if: ');
  //  console.log(cache);
    if (cache[filename]) {
        callback(cache[filename]);
    } else {
        fs.readFile(filename, "utf8", function(err, data) {
    //        console.log('in else: ');
      //      console.log(cache);
            if (err) {
                callback(err);
            } else {
                cache[filename] = data;
                callback(data);
            }
        });
    }
}

/***var files = [ "one.txt", "two.txt", "three.txt", "four.txt", "two.txt", "three.txt", "nil.txt" ];
***/
/***files.forEach(function(item) {

    inconsistentRead(item, function(data) {
        console.log(item + " : " + data);
});
});****/


/***cache = {};

files.forEach(function(item) {
setTimeout(() => {
    inconsistentRead(item, function(data) {
        console.log(item + " : " + data);
});},1000);
});***/

files.forEach(function(item){

createFileReader(item).onDataReady(function(data) 
    {   
//        console.log('on data ready');
        console.log(item + ' : ' + data);
        //... sometime
    });
});

files.forEach(function(item){

createFileReader(item).onDataReady(function(data) 
    {   
//        console.log('on data ready');
        console.log(item + ' : ' + data);
        //... sometime
    });
});

