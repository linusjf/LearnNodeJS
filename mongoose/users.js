#!/usr/bin/env node

const database = require("./database");
const UserModel = require("./user");

async function main() {
  const model = new UserModel();

  model.fullName = "Thomas Anderson";

  // Output model fields as JSON
  console.log(model.toJSON());

  console.log();
  // Output the full name
  console.log(model.fullName);

  const initials = model.getInitials();

  console.log(initials);

  await database.connect();

  await model.save();
  await UserModel.getUsers()
    .then(docs => {
      console.log(docs);
    })
    .catch(err => {
      console.error(err.message);
    });
}

(async() => {
  try {
    await main();
  } catch (err) {
    console.error(err.message);
  } finally {
    database.close();
  }
})();
