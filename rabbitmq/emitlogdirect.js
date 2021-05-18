#!/usr/bin/env node
require("dotenv").config();
const amqp = require("amqplib/callback_api");
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

amqp.connect(options, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    const exchange = "direct_logs";
    const args = process.argv.slice(2);
    const msg = args.slice(1).join(" ") || "Hello World!";
    const severity = (args.length > 0) ? args[0] : "info";

    channel.assertExchange(exchange, "direct", {
      durable: false
    });
    channel.publish(exchange, severity, Buffer.from(msg));
    console.log(" [x] Sent %s: '%s'", severity, msg);
  });

  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});
