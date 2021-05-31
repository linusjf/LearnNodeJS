#!/usr/bin/env node
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.set({ "Content-Type": "text/plain; charset=utf-8" });
  res.send("Home page");
});

app.get("/about", (req, res) => {
  res.set({ "Content-Type": "text/plain; charset=utf-8" });
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.set({ "Content-Type": "text/plain; charset=utf-8" });
  res.send("Contact page");
});

app.use((req, res) => {
  res.statusCode = 404;
  res.end("404 - page not found");
});

app.listen(3000, () => {
  console.log("Application started on port 3000");
});
