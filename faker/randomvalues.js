#!/usr/bin/env node
const faker = require('faker');

let number = faker.datatype.number();
console.log(number);

let uuid = faker.datatype.uuid();
console.log(uuid);

let word = faker.random.word();
console.log(word);

let words = faker.random.words(6);
console.log(words);
