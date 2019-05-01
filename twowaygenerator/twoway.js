/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
"use strict";

function* twoWayGenerator() {
    const what = yield null;
    console.log("Hello " + what);
}

let twoWay = twoWayGenerator();
twoWay.next();
twoWay.next("world");

twoWay = twoWayGenerator();
twoWay.next(); 
twoWay.throw( new Error());
