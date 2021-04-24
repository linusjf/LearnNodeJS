#!/usr/bin/env node

const fetch = require("node-fetch");

async function fn() {

  try {
    let response = await fetch("http://no-user-here");
    let _user = await response.json();
  } catch (err) {
    // catches errors both in fetch and response.json
    console.log(err.message);
  }
}

fn();
