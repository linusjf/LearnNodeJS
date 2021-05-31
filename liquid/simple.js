#!/usr/bin/env node
const {Liquid} = require("liquidjs");
const engine = new Liquid();

engine
  .parseAndRender("{{name | capitalize}}", {name: "lucy"})
  .then(console.log);

async function render() {
  const val = await engine
    .parseAndRender("{{name | capitalize}}", {name: "lucy"});
  console.log(val);
}

render();
