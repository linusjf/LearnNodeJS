#!/usr/bin/env node

const pg = require("pg");
const R = require("ramda");

const cs = "postgres://adminpgsql:postgresql@localhost:5432/mydb";

async function fetchNow() {

  const client = new pg.Client(cs);

  try {
    await client.connect();
    let result = await client.query("SELECT now()");
    return R.prop("now", R.head(result.rows));
  } catch (err)  {
    console.log(err.message);
  } finally {
    client.end();
  }
}

fetchNow().then(now => console.log(now));
