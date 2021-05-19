#!/usr/bin/env node
require("dotenv").config();
const Broker = require("rascal").BrokerAsPromised;
const config = require("./config.json");
config.vhosts.test.connection.url=process.env.CLOUD_AMQP_URL;

async function rascal_produce(){
  console.log("Publishing");
  var msg = "Hello World!";
  const broker = await Broker.create(config);
  broker.on("error", console.error);
  const publication = await broker.publish("demo_publication", msg);
  publication.on("error", console.error);
  console.log("Published");
}

setInterval(() => {
  rascal_produce().catch(console.error);
}, 2000);
