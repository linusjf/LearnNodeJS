#!/usr/bin/env node
const express = require("express");
const routes = require("./routes");

const app = express();

app.use(routes);

app.listen(3000, () => {
  console.log("Application started on port 3000");
});
