/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
/*jshint latedef: false */
"use strict";

const request = require("request");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const utilities = require("./utilities");

let downloaded = false;
const spidering = new Map();
let url;

function saveFile(filename, body, callback) {
    mkdirp(path.dirname(filename), err => {
        if (err)
            return callback(err);
        fs.writeFile(filename, body, err => {
            if (err)
                return callback(err);
            return callback(null, filename, true);
        });
    });
}

function download(url, filename, callback) {
    console.log(`Downloading ${url} to ${filename}`);
    request(url, (err, response, body) => { //[2]
        if (err)
            return callback(err);
        saveFile(filename, body, err => {
            console.log(`Downloaded and saved ${url} to ${filename}`);
            if (err)
                return callback(err);
            callback(null, body);
        });
    });
    downloaded = true;
}

function spider(url, nesting, callback) {
    if (spidering.has(url))
        return process.nextTick(callback);
    spidering.set(url, true);
    const filename = utilities.urlToFilename(url);
    fs.readFile(filename, "utf8", function(err, body) {
        if (err) {
            if (err.code !== "ENOENT")
                return callback(err, filename, false);
            return download(url, filename, function(err, body) {
                if (err)
                    return callback(err, filename, false);
                spiderLinks(url, body, nesting, callback);
            });
        }
        spiderLinks(url, body, nesting, callback);
    });
}

function spiderLinks(currentUrl, body, nesting, callback) {
    if (nesting === 0)
        return process.nextTick(callback);

    const links = utilities.getPageLinks(currentUrl, body);

    if (links.length === 0)
        return process.nextTick(callback);
    let completed = 0;
    let inError = false;

    function done(err) {
        if (err) {
            inError = true;
            return callback(err);
        }
        if (++completed === links.length && !inError)
            return callback(null, url, downloaded);
    }

    links.forEach(function(link) {
        spider(link, nesting - 1, done);
    });

}

function exitMessage() {
    console.error("Usage: node spider.js url {level}.\nLevel defaults to 1.");
    process.exit(1);
}

url = process.argv[2];
let level;
if (process.argv[3]) {
    level = parseInt(process.argv[3]);

    if (isNaN(level) || level <= 0)
        exitMessage();
} else
    level = 1;
if (url) {
    spider(url, level, (err, filename, downloaded) => {

        if (err) {
            console.log(err);

        } else if (downloaded) {
            console.log(`Completed the download of "${url}"`);

        } else {
            console.log(`"${url}" has already been downloaded`);
        }
    });
} else
    exitMessage();
