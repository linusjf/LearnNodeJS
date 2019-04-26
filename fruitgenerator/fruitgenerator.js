/*jshint globalstrict: true*/
/*jshint node: true */
/*jshint esversion: 6 */
"use strict";

function* fruitGenerator() 
{ 
  yield 'apple';
  yield 'orange';
  return 'watermelon';
} 

var newFruitGenerator = fruitGenerator();
console.log( newFruitGenerator.next());
console.log( newFruitGenerator.next());
console.log( newFruitGenerator.next()); 

