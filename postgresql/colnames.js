#!/usr/bin/env node

const pg = require("pg");

const cs = "postgres://adminpgsql:postgresql@localhost:5432/mydb";

const client = new pg.Client(cs);

client.connect().catch(err => {
  console.log(err);
});

client.query("SELECT * FROM cars").then(res => {
  const fields = res.fields.map(field => field.name);
  console.log(fields);
}).catch(err => {
  console.log(err.stack);
}).finally(() => {
  client.end();
});
