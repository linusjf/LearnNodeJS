#!/usr/bin/env node
 // controller.js
require("dotenv").config();
const mqtt = require("mqtt");
var options = {
    host: process.env.HOST,
    port: process.env.PORT,
    protocol: process.env.PROTOCOL,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
};
const client = mqtt.connect(options);

var garageState = "";
var connected = false;

client.on("connect", () => {
    console.log("Connected...");
    connected = true;
    client.subscribe("garage/connected");
    client.subscribe("garage/state");
    setTimeout(() => openClose(), 5000);
});

client.on("error", function(error) {
    console.log("Can't connect" + error);
    process.exit(1);
});

client.on("message", (topic, message) => {
    switch (topic) {
        case "garage/connected":
            return handleGarageConnected(message);
        case "garage/state":
            return handleGarageState(message);
    }
    console.log("No handler for topic %s", topic);
});

function handleGarageConnected(message) {
    console.log("garage connected status %s", message);
    connected = (message.toString() === "true");
}

function handleGarageState(message) {
    garageState = message;
    console.log("garage state update to %s", message);
}

function openGarageDoor() {
    // can only open door if we're connected to mqtt and door isn't already open
    if (connected && garageState !== "open") {
        // Ask the door to open
        client.publish("garage/open", "true");
    }
}

function closeGarageDoor() {
    // can only close door if we're connected to mqtt and door isn't already closed
    if (connected && garageState !== "closed") {
        // Ask the door to close
        client.publish("garage/close", "true");
    }
}

// --- For Demo Purposes Only ----//

// simulate opening garage door
function openClose() {
    setInterval(() => {
        console.log("open door");
        openGarageDoor();
    }, Math.floor(Math.random() * 1000));

    // simulate closing garage door
    setInterval(() => {
        console.log("close door");
        closeGarageDoor();
    }, Math.floor(Math.random() * 1000));
}