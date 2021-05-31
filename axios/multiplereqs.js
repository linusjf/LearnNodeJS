#!/usr/bin/env node
const axios = require("axios");

async function makeRequests() {

  let [u1, u2, u3] = await Promise.all([
    axios.get("https://api.github.com/users/fernal73"),
    axios.get("https://api.github.com/users/romani"),
    axios.get("https://api.github.com/users/adangel")
  ]);

  console.log(`Linus Fernandes: ${u1.data.created_at}`);
  console.log(`Roman Ivanov: ${u2.data.created_at}`);
  console.log(`Andreas Dangel: ${u3.data.created_at}`);
}

makeRequests();
