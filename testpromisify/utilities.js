/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
"use strict";

const urlParse = require('url').parse;
const urlResolve = require('url').resolve;
const slug = require('slug');
const path = require('path');
const cheerio = require('cheerio');
const debug = require('debug')('utilities');
debug.enabled = false;
var Promise = require('bluebird');

module.exports.promisify =
    function(callbackBasedApi) {
        return function promisified() {
            var args = Array.prototype.slice.call(arguments);
          debug(args);  
          return new Promise(function(resolve, reject) { 
    args.push(function(err, result) {
                    if (err)
                        return reject(err);
                    if (arguments.length <= 2)
                        resolve(result);
                    else
                        resolve(Array.prototype.slice.call(arguments, 1));
                });
            debug(args);
                callbackBasedApi.apply(null, args);
            });
        };
};

module.exports.urlToFilename = function urlToFilename(url) {
    const parsedUrl = urlParse(url);
    const urlPath = parsedUrl.path.split('/')
        .filter(function(component) {
            return component !== '';
        })
        .map(function(component) {
            return slug(component);
        })
        .join('/');
    let filename = path.join(parsedUrl.hostname, urlPath);
    if (!path.extname(filename).match(/htm/)) {
        filename += '.html';
    }
    return filename;
};

module.exports.getLinkUrl = function getLinkUrl(currentUrl, element) {
    const link = urlResolve(currentUrl, element.attribs.href || "");
    const parsedLink = urlParse(link);
    const currentParsedUrl = urlParse(currentUrl);
    if (parsedLink.hostname !== currentParsedUrl.hostname || !parsedLink.pathname) {
        return null;
    }
    return link;
};

module.exports.getPageLinks = function getPageLinks(currentUrl, body) {
    return [].slice.call(cheerio.load(body)('a'))
        .map(function(element) {
            return module.exports.getLinkUrl(currentUrl, element);
        })
        .filter(function(element) {
            return !!element;
        });
};
