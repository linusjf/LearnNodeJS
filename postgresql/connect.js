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
const movies = [];
const query = client.query("select title, year from movies");
query.then(res => {
  const data = res.rows;
  data.forEach(row => movies.push(row));
}).catch(function(err) {
        console.log('error: ', err);
    }).finally(() => {
  console.log(movies.length + " movies were loaded");
  client.end();
});
/* eslint-enable */
