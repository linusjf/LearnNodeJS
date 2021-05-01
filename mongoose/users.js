#!/usr/bin/env node

const UserModel = require("./user");
const model = new UserModel();

model.fullName = "Thomas Anderson";

// Output model fields as JSON
console.log(model.toJSON()); 

console.log();
// Output the full name
console.log(model.fullName);

const initials = model.getInitials();

console.log(initials);

UserModel.getUsers()
  .then(docs => {
    console.log(docs);
  })
  .catch(err => {
    console.error(err.message);
  });
