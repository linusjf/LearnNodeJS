#!/usr/bin/env node

const express = require("express");
const app = express();
app.get("/users", (req, res) => {
  // get all users
  console.log(`Get all users for request: ${req} and response : ${res} `);
  const users = [{
    id: 1,
    name: "Emanuele"
  }, {
    id: 2,
    name: "Tessa"
  }];
  res.send(users);
});
app.get("/users/:id", (req, res) => {
  // get the user with the specified id
  console.log(`Get user id for request: ${req} and response : ${res} `);
  res.send("User id request received");
});
app.post("/users", (req, res) => {
  // create a new user
  console.log(`create new user for request: ${req} and response : ${res} `);
  res.send("User id post received");
});
app.put("/users/:id", (req, res) => {
  // update the user with specified id
  console.log(`updating user for request: ${req} and response : ${res} `);
  res.send("User id put received");
});
app.patch("/users/:id", (req, res) => {
  // update the user with specified id
  console.log(`patching user for request: ${req} and response : ${res} `);
  res.send("User id patch received");
});
app.delete("/users/:id", (req, res) => {
  // delete the user with specified id
  console.log(`delete user for request: ${req} and response : ${res} `);
  res.send("User id delete received");
});
app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
