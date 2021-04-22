#!/usr/bin/env node

const {
  Pool
} = require("pg");

const pool = new Pool({
  user: "adminpgsql",
  host: "localhost",
  database: "mydb",
  password: "postgresql",
  port: 5432,
});

/* eslint-disable */
pool.on("error", (err, _client) => {
  console.error("Error:", err.message);
});
/* eslint-enable */

const createQuery = `
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    email varchar NOT NULL,
    firstName varchar NOT NULL,
    lastName varchar NOT NULL,
    age int NOT NULL,
    created_on timestamp not NULL default now()
);
`;

const insertQuery = `
INSERT INTO users (email, firstName, lastName, age)
VALUES ('johndoe@gmail.com', 'john', 'doe', 21)
`;

function createTable(client) {
  return new Promise((resolve, reject) => {
    client.query(createQuery)
      .then(res => {
        console.log("Table users is successfully created");
        console.log(res.length + " statements executed successfully.");
        resolve(client);
      }).catch(err => {
        reject(err);
      });
  });
}

function insertData(client) {
  return new Promise((resolve, reject) => {
    client.query(insertQuery)
      .then(res => {
        client.release();
        console.log(res.rowCount + " record(s) are successfully inserted");
        resolve(client);
      }).catch(err => {
        reject(err);
      });
  });
}

pool.connect().then(createTable)
  .then(insertData)
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    pool.end().then(() => console.log("pool has ended"));
  });
