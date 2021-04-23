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
VALUES ('johndoe@gmail.com', 'john', 'doe', 21),
  ('anna@gmail.com', 'anna', 'dias', 35),
  ('jane@gmail.com', 'jane', 'goodall', 45);
`;

const selectQuery = `
SELECT *
FROM users;
`;

const updateQuery = `
UPDATE users
SET age = 22
WHERE email = 'johndoe@gmail.com'
`;

const deleteQuery = `
DELETE FROM users
WHERE email = 'johndoe@gmail.com'
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
        console.log(res.rowCount + " record(s) are successfully inserted");
        resolve(client);
      }).catch(err => {
        reject(err);
      });
  });
}

function selectAll(client) {
  return new Promise((resolve, reject) => {
    client.query(selectQuery)
      .then(res => {
        console.log(res.rowCount + " record(s) are returned");
        console.log(res.rows);
        resolve(client);
      }).catch(err => {
        reject(err);
      });
  });
}

function updateData(client) {
  return new Promise((resolve, reject) => {
    client.query(updateQuery)
      .then(res => {
        console.log(res.rowCount + " record(s) updated.");
        resolve(client);
      }).catch(err => {
        reject(err);
      });
  });
}

function deleteData(client) {
  return new Promise((resolve, reject) => {
    client.query(deleteQuery)
      .then(res => {
        console.log(res.rowCount + " record(s) deleted.");
        resolve(client);
      }).catch(err => {
        reject(err);
      });
  });
}

function release(client) {
  return new Promise((resolve, reject) => {
    client.release();
    resolve(client);
  });
}

pool.connect().then(createTable)
  .then(insertData)
  .then(selectAll)
  .then(updateData)
  .then(selectAll)
  .then(deleteData)
  .then(selectAll)
  .then(release)
  .catch(err => {
    console.error(err);
  })
  .finally(() => {});

pool.end().then(() => console.log("pool has ended"));
