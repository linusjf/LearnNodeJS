#!/usr/bin/env node

const database = require("./database");
const EmailModel = require("./email");

async function main() {
  await database.connect();
  const msg = new EmailModel({
    email: "ADA.LOVELACE@GMAIL.COM"
  });
  await msg.save();
  var record = await EmailModel
    .find({
      email: "ada.lovelace@gmail.com" 
    });
  console.log(record);
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e.message);
  } finally {
    database.close();
  }
})();
