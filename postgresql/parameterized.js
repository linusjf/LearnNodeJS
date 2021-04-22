#!/usr/bin/env node

const pg = require("pg");

const cs = "postgres://adminpgsql:postgresql@localhost:5432/mydb";

const client = new pg.Client(cs);

client.connect().catch(err => {
  console.log(err.message);
});

const sql = "SELECT * FROM cars WHERE price > $1";
const values = [50000];

client.query(sql, values).then(res => {

  const data = res.rows;

  data.forEach(row => console.log(row));

}).catch(err => {
  console.log(err.message);
}).finally(() => {
  client.end();
});
