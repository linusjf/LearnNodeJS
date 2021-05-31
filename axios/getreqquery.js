#!/usr/bin/env node
const axios = require("axios");
const url = require("url");

async function makeGetRequest() {
  let payload = { name: "John Doe", occupation: "gardener" };
  const params = new url.URLSearchParams(payload);
  let res = await axios.get(`http://httpbin.org/get?${params}`);
  let data = res.data;
  console.log(data);
}

makeGetRequest();

