var util = require("util"),
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
            console.log('Loaded file ' + file);
           // response.end();
        });
    });
}

var options = {
    port     : 80
,   host     : 'api.twitter.com'
,   method   : 'GET'
,   path     : '/1/statuses/public_timeline.json'
}

// var twitter_client = http.request(options);

var tweet_emitter = new events.EventEmitter();

function get_tweets() {
    var request = http.request(options);
    request.addListener("response", function(response) {
        var body = "";
        response.addListener("data", function(data) {
            body += data;
        });
        response.addListener("end", function() {
            var tweets = JSON.parse(body);
            if (tweets.length > 0) {
                tweet_emitter.emit("tweets", tweets);
            }
        });
    });
//    request.close();
}

setInterval(get_tweets, 5000);

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    if (uri === "/stream") {
        var listener = tweet_emitter.addListener("tweets", function(tweets) {
            response.statusCode = 200;
            response.setHeader("Content-Type","text/plain");
            response.write(JSON.stringify(tweets));
            response.end();
            clearTimeout(timeout);
        });
        var timeout = setTimeout(function() {
            response.statusCode = 200;
            response.setHeader("Content-Type", "text/plain");
            response.write(JSON.stringify([]));
            response.end();
            tweet_emitter.removeAllListeners('tweets');
        })
    } else {
        load_static_file(uri, response);
    }
}).listen(8080);

console.log("Server running at http://localhost:8080/");
