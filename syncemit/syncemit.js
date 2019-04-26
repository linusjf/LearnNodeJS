/*jshint globalstrict: true*/
/*jshint node: true */

/*jshint globalstrict: true*/
/*jshint node: true */

"use strict";
var EventEmitter = require('events'). EventEmitter;
var util = require("util");
function SyncEmit()
{ this.emit(' ready');  }

util.inherits( SyncEmit, EventEmitter );
var syncEmit = new SyncEmit();
syncEmit.on(' ready', function()
    { console.log(' Object is ready to be used');  });
