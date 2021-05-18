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

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_topic.js <facility>.<severity>");
  process.exit(1);
}

async function consume() {
  const conn = await amqplib.connect(options, "heartbeat=60");
  const channel = await conn.createChannel();
  const exchange = "topic_logs"; 
  await conn.createChannel();
  await channel.assertExchange(exchange, "topic", {
    durable: false
  });
  const q = await channel.assertQueue("", {
    exclusive: true
  });
  console.log(" [*] Waiting for logs. To exit press CTRL+C");
  args.forEach(function(key) {
    channel.bindQueue(q.queue, exchange, key);
  });
  channel.consume(q.queue, function(msg) {
    console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
  }, {
    noAck: true
  });
}

consume();
