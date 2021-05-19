#!/usr/bin/env node
require("dotenv").config();
const mqtt = require("mqtt");

const options = {
  host: process.env.HOST,
  port: process.env.PORT,
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  protocol: process.env.PROTOCOL
};

// Create a client connection
const client = mqtt.connect(options);

client.on("connect", () => { 
  client.subscribe("hello/world", function() {
    client.on("message", function(topic, message, _packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });

  const msg = "my message";
  client.publish("hello/world", msg, () => {
    console.log("Message %s is published", msg);
    client.end(); 
  });
});
