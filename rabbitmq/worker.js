#!/usr/bin/env node
require("dotenv").config();
const amqp = require("amqplib/callback_api");

amqp.connect(process.env.CLOUD_AMQP_URL, function(error, connection) {
  connection.createChannel(function(error, channel) {
    const queue = "task_queue";

    channel.assertQueue(queue, {
      durable: true
    });
    channel.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, function(msg) {
      const secs = msg.content.toString().split(".").length - 1;

      console.log(" [x] Received %s", msg.content.toString());
      setTimeout(function() {
        console.log(" [x] Done");
        channel.ack(msg);
      }, secs * 1000);
    }, {
      noAck: false
    });
  });
});
