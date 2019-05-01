/*jshint globalstrict: true*/
/*jshint node: true */
"use strict";
const EventEmitter = require("events"). EventEmitter;
const util = require("util");
function SyncEmit()
{ this.emit("ready");  }

util.inherits( SyncEmit, EventEmitter );
const syncEmit = new SyncEmit();
syncEmit.on("ready", function()
    { console.log("Object is ready to be used");  });
