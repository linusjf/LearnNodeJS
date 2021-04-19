/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
/* jshint latedef:false */
"use strict";
const thunkify = require("thunkify");
const co = require("co");
const request = thunkify(require("request"));
const fs = require("fs");
const mkdirp = thunkify(require("mkdirp"));
const readFile = thunkify(fs.readFile);
const writeFile = thunkify(fs.writeFile);
const nextTick = thunkify(process.nextTick);
const utilities = require("./utilities");
const path = require("path");

const cmdConfig = require("./cmdconfig");
const validator = require("./validator");
const debug = require("debug")("spider");
debug.enabled = cmdConfig.get("debug", false);

function* download(url, filename) {
    console.log("Downloading " + url);
    const results = yield request(url);
    const body = results[1];
    yield mkdirp(path.dirname(filename));
    yield writeFile(filename, body);
    console.log("Downloaded and saved:" + url);
    return body;
}

function* spiderLinks(currentUrl, body, nesting) {
    if (nesting === 0) {
        return yield nextTick();
    }
    const links = utilities.getPageLinks(currentUrl, body);
    for (let i = 0; i < links.length; i++)
        yield spider(links[i], nesting - 1);
}


function* spider(url, nesting) {
    const filename = utilities.urlToFilename(url);
    let body;
    try {
        body = yield readFile(filename, "utf8");
    } catch (err) {
        if (err.code !== "ENOENT") {
            throw err;
        }
        body = yield download(url, filename);
    }
    yield spiderLinks(url, body, nesting);
}

if (!validator.validate())
    process.exit();

co(function*() {
    try {
        yield spider(cmdConfig.get("url"), cmdConfig.get("nesting", 1));
        console.log("Download  complete");
    } catch (err) {
        console.log(err);
    }
});