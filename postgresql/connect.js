#!/usr/bin/env node

const {
  Client
} = require("pg");

const client = new Client({
  user: "adminpgsql",
  host: "localhost",
  database: "mydb",
  password: "postgresql",
  port: 5432,
});
/* eslint-disable */
client.connect((_err, _client) => {
  console.log("Connected....");
});
/* eslint-enable */
