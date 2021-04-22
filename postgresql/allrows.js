#!/usr/bin/env node

const pg = require("pg");
const R = require("ramda");

const cs = "postgres://adminpgsql:postgresql@localhost:5432/mydb";

const client = new pg.Client(cs);

client.connect().catch(err => {
  console.log(err.message);
});

client.query("SELECT * FROM cars").then(res => {

  const data = res.rows;

  console.log("all data");
  data.forEach(row => {
    console.log(`Id: ${row.id} Name: ${row.name} Price: ${row.price}`);
  });
  console.log("Sorted prices:");
  const prices = R.pluck("price", R.sortBy(R.prop("price"), data));
  console.log(prices);

}).catch(err => {
  console.log(err.message);
}).finally(() => {
  client.end();
});
