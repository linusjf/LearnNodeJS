#!/usr/bin/env node
const fs = require("fs");
const fspromises = require("fs.promises");
fs.readFile("words.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log("Script continues...");

async function read() {
  let data = await fspromises.readFile("words.txt", "UTF-8").catch(err => console.error(err.message));
  console.log(data);
}

async function main() {
  await read();
  console.log("Script continues too...");
}

main();
