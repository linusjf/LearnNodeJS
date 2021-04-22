#!/usr/bin/env node

const pg = require("pg");

var config = {
  user: "adminpgsql",
  password: "postgresql",
  database: "mydb"
};

const pool = new pg.Pool(config);

pool.connect()
  .then(client => {
    return client.query("SELECT * FROM cars WHERE id = $1", [1])
      .then(res => {
        client.release();
        console.log(res.rows[0]);
      })
      .catch(e => {
        client.release();
        console.log(e.message);
      });
  }).finally(() => pool.end());
