/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
"use strict";
var util = require("util"),
    https = require("https"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    events = require("events");

function load_static_file(uri, response) {
    var filename = path.join(process.cwd(), uri);
    fs.exists(filename, function(exists) {
        if (!exists) {
            response.setHeader("Content-Type", "text/plain");
            response.statusCode = 404;
            response.write("404 Not Found\n");
            response.end();
            return;
        }
        fs.readFile(filename, "binary", function(err, file) {
            if (err) {
                response.setHeader("Content-Type", "text/plain");
                response.statusCode = 500;
                response.write(err + file + "\n");
                response.end();
                return;
            }
            response.setHeader("Content-Type", "text/html");
            response.statusCode = 200;
            response.write(file);
            response.end();
        });
    });
}

var options = {
    port: 443,
    host: 'www.random.org',
    method: 'GET',
    path: '/strings/?num=10&len=8&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new'
};

var string_emitter = new events.EventEmitter();

string_emitter.on('error', function(err) {
    console.error('whoops! there was an error' + err);
});

function get_strings() {
    console.log('get_strings invoked');
    var request = https.get(options, function(response) {
        const {
            statusCode
        } = response;
        const contentType = response.headers['content-type'];

        let error;
        if (statusCode != 200) {
            error = new Error('Request Failed.\n' +
                `Status Code
                        : $ { statusCode }`);
        }
        var body = "";
        response.on("data", function(data) {
            body += data;
        });
        response.on("end", function() {
            var strings = body;
            if (strings.length > 0) {

                string_emitter.emit("strings", strings);
            }
        });
    });

}

setInterval(get_strings, 5000);

http.createServer(function(request, response) {
        var uri = url.parse(request.url).pathname;
        if (uri == "/stream") {
            string_emitter.once("strings", function(values) {
                response.statusCode = 200;
                response.setHeader("Content-Type", "text/plain");

                response.write(values);
                response.end();
                clearTimeout(timeout);
            });
            var timeout = setTimeout(
                function() {
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "text/plain");
                    response.write(JSON.stringify([]));
                    response.end();
                    //          string_emitter.off("strings", function(){});
                },
                10000);
        } else {
            console.log('calling else ' + uri);
            load_static_file(uri, response);
        }
    })
    .listen(8080);

console.log("Server running at http://localhost:8080/");
