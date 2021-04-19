/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
"use strict";
const cmdConfig = require("./cmdconfig");
const debug = require("debug")("TaskQueue");
debug.enabled = cmdConfig.get("debug", false);
const co = require("co");

class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.taskQueue = [];
        this.consumerQueue = [];
        this.spawnWorkers(concurrency);
    }

    spawnWorkers(concurrency) {
        for (let i = 0; i < concurrency; i++) {
            co(function*() {
                while (true) {
                    const task = yield this.nextTask();
                    yield task;
                }
            }.bind(this));
        }
    }

    nextTask() {
        return (callback) => {
            if (this.taskQueue.length !== 0)
                return callback(null, this.taskQueue.shift());
            this.consumerQueue.push(callback);
        };
    }

    pushTask(task) {
        if (this.consumerQueue.length !== 0) this.consumerQueue.shift()(null, task);
        else
            this.taskQueue.push(task);
    }
}

module.exports = TaskQueue;