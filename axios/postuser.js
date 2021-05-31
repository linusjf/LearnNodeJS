#!/usr/bin/env node
const axios = require("axios");

async function makePostRequest() {

  let params = {
    id: 6,
    first_name: "Fred",
    last_name: "Blair",
    email: "freddyb34@gmail.com"
  };

  let res = await axios.post("http://localhost:3000/users/", params);
  console.log(res.data);
}

makePostRequest();
