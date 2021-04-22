#!/usr/bin/env node

const pg = require("pg");
const R = require("ramda");

const cs = "postgres://adminpgsql:postgresql@localhost:5432/mydb";

const client = new pg.Client(cs);

client.connect().catch (e => {
  console.log(e.message);
});

const query = {
  text: "SELECT * FROM cars",
  rowMode: "array"
};

client.query(query).then(res => {
  const data = res.rows;
  console.log("all data");
  data.forEach(row => {
    console.log(`Id: ${row[0]} Name: ${row[1]} Price: ${row[2]}`);
  });
  const prices = data.map(x => x[2]);
  console.log("Sorted prices:");
  const sorted = R.sort(R.comparator(R.lt), prices);
  console.log(sorted);
  console.log("Reverse sorted prices:");
  const reverseSorted = R.sort(R.comparator(R.gt), prices);
  console.log(reverseSorted);
}).catch (e =>  {
  console.log(e.message);
}).finally(() => {
  client.end();
});
