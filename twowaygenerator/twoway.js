/*jshint globalstrict: true*/
/*jshint node: true */

/*jshint globalstrict: true*/
/*jshint node: true */

"use strict";

function* twoWayGenerator() {
    var what = yield null;
    console.log('Hello ' + what);
}

var twoWay = twoWayGenerator();
twoWay.next();
twoWay.next('world');

twoWay = twoWayGenerator();
twoWay.next(); 
twoWay.throw( new Error());
