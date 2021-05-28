#!/usr/bin/env node
const R = require("ramda");
const moment = require("moment");

const users = [
  { name: "John", city: "London", born: "2001-04-01" },
  { name: "Lenny", city: "New York", born: "1997-12-11" },
  { name: "Andrew", city: "Boston", born: "1987-02-22" },
  { name: "Peter", city: "Prague", born: "1936-03-24" },
  { name: "Anna", city: "Bratislava", born: "1973-11-18" },
  { name: "Albert", city: "Bratislava", born: "1940-12-11" },
  { name: "Adam", city: "Trnava", born: "1983-12-01" },
  { name: "Robert", city: "Bratislava", born: "1935-05-15" },
  { name: "Robert", city: "Prague", born: "1998-03-14" }
];

let res1 = R.filter(R.where({ city: R.equals("Bratislava") }))(users);
console.log(res1);

let res2 = R.filter(R.where({
  city: R.equals("Bratislava"),
  name: R.startsWith("A")
}))(users);

console.log(res2);

let res3 = R.filter(R.where({
  born: (dt) => getAge(dt) > 40}))(users);

console.log(res3);

function getAge(dt) {
  return moment.duration(moment() - moment(dt, "YYYY-MM-DD", true)).years();
}
