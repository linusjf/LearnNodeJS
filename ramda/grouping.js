#!/usr/bin/env node
const R = require("ramda");

let students = [
  { name: "Adam", score: 84 },
  { name: "Eddy", score: 58 },
  { name: "Peter", score: 69 },
  { name: "Roman", score: 93 },
  { name: "Jane", score: 56 },
  { name: "Lucy", score: 76 },
  { name: "Jack", score: 88 },
];

var groupByGrade = R.groupBy((student) => {

  let score = student.score;

  return score < 65 ? "F" :
    score < 70 ? "D" :
      score < 80 ? "C" :
        score < 90 ? "B" : "A";
});

let grouped = groupByGrade(students);

console.log("Student(s) having A grade:");
console.log(grouped["A"]);

console.log("Student(s) having B grade:");
console.log(grouped["B"]);

console.log("Student(s) having C grade:");
console.log(grouped["D"]);

console.log("Student(s) having D grade:");
console.log(grouped["D"]);

console.log("Student(s) having F grade:");
console.log(grouped["F"]);
