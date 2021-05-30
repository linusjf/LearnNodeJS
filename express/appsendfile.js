#!/usr/bin/env node
const express = require("express");
const path = require("path");
const app = express();

app.get("/file", (req, res) => {
  res.set({ "Content-Type": "image/jpeg" });

  let file = path.join(__dirname, "img/book-image.jpg");

  res.sendFile(file);
  //res.download(file, "book-image.jpg");
});

app.listen(3000, () => {
  console.log("Application started on port 3000");
});
