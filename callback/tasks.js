"use strict";

module.exports = {
    concat: function(a, b, callback) {
        setTimeout(function() {
            let r = a + b;
            callback(r);
        }, 0);
    },

    upper: function(a, callback) {
        setTimeout(function() {
            let r = a.toUpperCase();
            callback(r);
        }, 0);
    },
    decor: function(a, callback) {
        setTimeout(function() {
            let r = "* " + a + " *";
            callback(r);
        }, 0);
    }
};