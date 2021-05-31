#!/usr/bin/env node
const axios = require("axios");

async function makePostRequest() {
  let payload = { name: "John Doe", occupation: "gardener" };
  let res = await axios.post("http://httpbin.org/post", payload);
  let data = res.data;
  console.log(data);
}

makePostRequest();
