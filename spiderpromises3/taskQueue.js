"use strict";

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

next() { 
	var self = this; 
	while( self.running < self.concurrency && self.queue.length) 
	{ 
		var task = self.queue.shift();
		task().then( function() 
		{ 
			self.running--;
			self.next();
		});
		self.running ++; 
	}
}
}
