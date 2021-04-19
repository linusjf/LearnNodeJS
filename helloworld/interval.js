#!/usr/bin/env node

"use strict";
setInterval(() => console.log("function 1"), 1000);
setInterval(() => {
    console.log("function 2");
    /* jshint ignore:start */
    while (true) {
        // empty block
    }
    /* jshint ignore:end */
}, 1000);
console.log("starting");