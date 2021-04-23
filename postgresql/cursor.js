#!/usr/bin/env node

const {
  Pool
} = require("pg");
const Cursor = require("pg-cursor");

const pool = new Pool({
  user: "adminpgsql",
  host: "localhost",
  database: "mydb",
  password: "postgresql",
  port: 5432,
});

(async () => {
  const client = await pool.connect();
  const query = "SELECT * FROM users";

  const cursor = await client.query(new Cursor(query));

  cursor.read(1, (err, rows) => {
    console.log("We got the first row set");
    console.log(rows);

    cursor.read(1, (err, rows) => {
      console.log("This is the next row set");
      console.log(rows);
    });
    cursor.close(() => client.release());
  });
})();
pool.end().then(() => console.log("pool has ended"));
