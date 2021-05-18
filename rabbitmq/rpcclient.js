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

const args = process.argv.slice (2);

if (args.length === 0) {
  console.log ("Usage: rpc_client.js num");
  process.exit (1);
}

async function produce() {
  const conn = await amqp.connect(options);
  const channel = await conn.createChannel();
  const queue = await channel.assertQueue("",
    {exclusive: true});
  const correlationId = generateUuid ();
  const num = parseInt(args[0]);
  console.log ("[x] Requesting fib (%d)", num);
  channel.consume (queue.queue, function (msg) {
    if (msg.properties.correlationId === correlationId) {
      console.log ("[.] Got%s", msg.content.toString ());
      setTimeout (function () {
        channel.close();
        conn.close ();
        process.exit (0);
      }, 500);
    }
  }, {
    noAck: true
  });
  channel.sendToQueue ("rpc_queue",
    Buffer.from (num.toString()), {
      correlationId: correlationId,
      replyTo: queue.queue
    });
}

function generateUuid() {
  return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}

produce();
