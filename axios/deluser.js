#!/usr/bin/env node
const axios = require("axios");

async function makePostRequest() {
  try {
    let res = await axios.delete("http://localhost:3000/users/2/");
    console.log(res.status);
  } catch (err) {
    console.error(err.message);
  }
}

makePostRequest();
