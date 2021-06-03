#!/usr/bin/env node

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

/**
 * The state of the garage, defaults to closed
 * Possible states : closed, opening, open, closing
 */
var state = "closed";

client.on("connect", () => {
    client.subscribe("garage/open");
    client.subscribe("garage/close");

    // Inform controllers that garage is connected
    client.publish("garage/connected", "true");
    sendStateUpdate();
});

client.on("error", function(error) {
    console.log("Can't connect" + error);
    process.exit(1);
});

client.on("message", (topic, message) => {
    console.log("received message %s %s", topic, message);
    switch (topic) {
        case "garage/open":
            return handleOpenRequest(message);
        case "garage/close":
            return handleCloseRequest(message);
    }
});

function sendStateUpdate() {
    console.log("sending state %s", state);
    client.publish("garage/state", state);
}

function handleOpenRequest(_message) {
    console.log("Handle open request");
    if (state !== "open" && state !== "opening") {
        console.log("opening garage door");
        state = "opening";
        sendStateUpdate();

        // simulate door open after 1 seconds (would be listening to hardware)
        setTimeout(() => {
            state = "open";
            sendStateUpdate();
        }, 1000);
    }
}

function handleCloseRequest(_message) {
    console.log("Handle close request");
    if (state !== "closed" && state !== "closing") {
        state = "closing";
        sendStateUpdate();

        // simulate door closed after 5 seconds (would be listening to hardware)
        setTimeout(() => {
            state = "closed";
            sendStateUpdate();
        }, 1000);
    }
}

/**
 * Want to notify controller that garage is disconnected before shutting down
 */
function handleAppExit(options, err) {
    if (err) {
        console.log(err.stack);
    }

    if (options.cleanup) {
        client.publish("garage/connected", "false");
    }

    if (options.exit) {
        process.exit();
    }
}

/**
 * Handle the different ways an application can shutdown
 */
process.on("exit", handleAppExit.bind(null, {
    cleanup: true
}));
process.on("SIGINT", handleAppExit.bind(null, {
    exit: true
}));
process.on("uncaughtException", handleAppExit.bind(null, {
    exit: true
}));