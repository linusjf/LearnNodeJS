#!/usr/bin/env node

const express = require("express");
const app = express();
app.get("/users", (req, res) => {
  // get all users
});
app.get("/users/:id", (req, res) => {
  // get the user with the specified id
});
app.post("/users", (req, res) => {
  // create a new user
});
app.put("/users/:id", (req, res) => {
  // update the user with specified id
});
app.delete("/users/:id", (req, res) => {
  // delete the user with specified id
});
app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
