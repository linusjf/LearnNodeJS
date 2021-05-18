#!/usr/bin/env node
require("dotenv").config();
const amqp = require("amqplib");
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

async function consume() {
  const conn = await amqp.connect(options);
  const ch = await conn.createChannel();
  const q = "rpc_queue";
  await ch.assertQueue(q, {durable: false});
  ch.prefetch(1);
  console.log(" [x] Awaiting RPC requests");
  await ch.consume(q, msg => {
    const n = parseInt(msg.content.toString());

    console.log(" [.] fib(%d)", n);

    const r = fibonacci(n);
    ch.sendToQueue(msg.properties.replyTo,
      Buffer.from(r.toString()), {
        correlationId: msg.properties.correlationId
      });

    ch.ack(msg);
  });
}

function fibonacci(n) {
  if (n === 0 || n === 1)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}

consume();
