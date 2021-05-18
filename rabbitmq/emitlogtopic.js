#!/usr/bin/env node
require("dotenv").config();
const amqplib = require("amqplib");
const options = {
  protocol: process.env.PROTOCOL,
  hostname: process.env.HOSTNAME,
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  locale: process.env.LOCALE,
  frameMax: process.env.FRAMEMAX,
  heartbeat: process.env.HEARTBEAT,
  vhost: process.env.VHOST
};

async function produce() {
  console.log("Publishing");
  const conn = await amqplib.connect(options, "heartbeat=60");
  const ch = await conn.createChannel();
  const exch = "topic_logs";
  const args = process.argv.slice(2);
  const key = (args.length > 0) ? args[0] : "anonymous.info";
  const msg = args.slice(1).join(" ") || "Hello World!";
  await ch.assertExchange(exch, "topic", {durable: false}).catch(console.error);
  await ch.publish(exch, key, Buffer.from(msg));
  console.log(" [x] Sent %s:'%s'", key, msg);
  setTimeout( function()  {
    ch.close();
    conn.close();},  500 );
}

produce();
