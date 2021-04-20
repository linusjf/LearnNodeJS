#!/usr/bin/env node

var express = require("express");
var app = express();

var myLogger = function(req, res, next) {
  console.log("LOGGED");
  next();
};

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(myLogger);
app.use(requestTime);


// error handler
/* jshint ignore:start */
/* eslint-disable */
app.use(function (err, req, res, _next) {
  res.status(400).send(err.message);
});
/* jshint ignore:end */
/* eslint-enable */

app.get("/", function (req, res) {
  var responseText = "Hello, World!<br>";
  responseText += "<small>Requested at: " + req.requestTime + "</small>";
  res.send(responseText);
});

app.listen(3000);
