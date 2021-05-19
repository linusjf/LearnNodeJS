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
// if the connection is closed or fails to be established at all, we will reconnect
var amqpConn = null;
async function start() {
  try {
    amqpConn = await amqp.connect(options);
    amqpConn.on("error", function(err) {
      if (err.message !== "Connection closing") {
        console.error("[AMQP] conn error", err.message);
      }
    });
    amqpConn.on("close", function() {
      console.error("[AMQP] reconnecting");
      return setTimeout(start, 1000);
    });
    console.log("[AMQP] connected");
    await whenConnected();
  } catch (err) {
    console.error("[AMQP]", err.message);
    return setTimeout(start, 1000);
  }
}

async function whenConnected() {
  await startPublisher();
  await startWorker();
}

var pubChannel = null;
const offlinePubQueue = [];
async function startPublisher() {
  try {
    pubChannel = await amqpConn.createConfirmChannel();
    await pubChannel.on("error",  err => console.error("[AMQP] channel error", err.message));
    await pubChannel.on("close", () => console.log("[AMQP] channel closed"));

    /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
    while (true) {
      const m = offlinePubQueue.shift();
      if (!m) break;
      publish(m[0], m[1], m[2]);
    }
  } catch(err) {
    if (closeOnErr(err)) return;
  }
}

function publish(exchange, routingKey, content) {
  if (pubChannel == null) 
    offlinePubQueue.push([exchange, routingKey, content]);
  else
    pubChannel.publish(exchange, routingKey, content, { persistent: true });
}

var ch = null;
// A worker that acks messages only if processed succesfully
async function startWorker() {
  try {
    ch = await amqpConn.createChannel();
    await  ch.on("error", function(err) {
      console.error("[AMQP] channel error", err.message);
    });

    await ch.on("close", function() {
      console.log("[AMQP] channel closed");
    });

    await ch.prefetch(10);
    await ch.assertQueue("jobs", { durable: true });
    await ch.consume("jobs", processMsg, { noAck: false });
    console.log("Worker is started");

  } catch (err) {
    if (closeOnErr(err)) return;
  }
}

function processMsg(msg) {
  work(msg, function(ok) {
    try {
      if (ok)
        ch.ack(msg);
      else
        ch.reject(msg, true);
    } catch (e) {
      closeOnErr(e);
    }
  });
}

function work(msg, cb) {
  console.log("Got msg ", msg.content.toString());
  cb(true);
}

function closeOnErr(err) {
  if (!err) return false;
  console.error("[AMQP] error", err);
  amqpConn.close();
  return true;
}

setInterval(function() {
  publish("", "jobs", new Buffer.from("work work work"));
}, 1000);

start();
