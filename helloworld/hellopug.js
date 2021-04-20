#!/usr/bin/env node

const express = require("express");
const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/hello", function(req, res) {
  res.render("hello", {
    title: "Hey",
    messageTitle: "Hello, noders",
    messageText: "lorem ipsum...."
  });
});

app.listen(8000, () => {
  console.log("Express hellopug app listening on port 8000!");
});
