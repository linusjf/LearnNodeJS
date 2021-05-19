#!/usr/bin/env node
require("dotenv").config();
const Broker = require("rascal").BrokerAsPromised;
const config = require("./config.json");
config.vhosts.test.connection.url = process.env.CLOUD_AMQP_URL;

async function rascal_consume(){
  console.log("Consuming");
  const broker = await Broker.create(config);
  broker.on("error", console.error);
  const subscription = await broker.subscribe("demo_subscription", "b1");
  subscription.on("message", (message, content, ackOrNack)=>{
    console.log(content);
    ackOrNack();
    //    subscription.cancel();
  });
  subscription.on("error", console.error);
  subscription.on("invalid_content", (_err,_message,_ackOrNack) =>{
    console.log("Failed to parse message");
  });
}

rascal_consume().catch(console.error);
