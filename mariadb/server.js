#!/usr/bin/env node

const express = require("express");
const pool = require("./connect.js");
const app = express();
const port = 8080;

// expose an endpoint "people"
app.get("/people", async (req, res) => {
  let conn;
  try {
    // establish a connection to MariaDB
    conn = await pool.getConnection();

    // create a new query
    var query = "select name from people";

    // execute the query and set the result to a new variable
    var rows = await conn.query(query);

    // return the results
    res.send(rows);
  } catch (err) {
    console.error(err.message);
    res.send(err.message);
  } finally {
    if (conn)
      conn.release();
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
