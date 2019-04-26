/*jshint globalstrict: true*/
/*jshint node: true */

/*jshint globalstrict: true*/
/*jshint node: true */

/*jshint globalstrict: true*/
/*jshint node: true */

/*jshint globalstrict: true*/
/*jshint node: true */

/*jshint globalstrict: true*/
/*jshint node: true */

/*jshint globalstrict: true*/
/*jshint node: true */

"use strict";
const cmdConfig = require('./cmdconfig');
const debug = require('debug')('TaskQueue');
debug.enabled = cmdConfig.get('debug',false);
console.log(debug.enabled);

module.exports = class TaskQueue {
  constructor (concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  pushTask (task) {
    this.queue.push(task);
    this.next();
  }

  next() 
  { 
    
    while( this.running < this.concurrency && this.queue.length) 
    { 
      debug('running='+this.running);
      var task = this.queue.shift();
      task().then( () => 
      { 
        this.running--;
      debug('calling next running = '+this.running);
        this.next();
      });
      this.running++; 
      debug('running incremented = '+this.running);
    }
}

}
