#!/usr/bin/env node
const axios = require("axios");
const FormData = require("form-data");

async function makePostRequest() {
  const form_data = new FormData();
  form_data.append("name", "John Doe");
  form_data.append("occupation", "gardener");

  let res = await axios.post("http://httpbin.org/post", form_data, 
    { headers: form_data.getHeaders() });

  let data = res.data;
  console.log(data);
}

makePostRequest();
