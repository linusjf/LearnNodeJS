#!/usr/bin/env node

const pg = require("pg");
const R = require("ramda");

const cs = "postgres://adminpgsql:postgresql@localhost:5432/mydb";

const client = new pg.Client(cs);
client.connect().catch(err => {
  console.log("error: ", err);
});

client.query("SELECT 1 + 4").then(res => {
  const result = R.head(R.values(R.head(res.rows)));
  console.log(result);
}).catch(err => {
  console.log("error: ", err);
}).finally(() => client.end());
