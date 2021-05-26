#!/usr/bin/env node
const {Model, Sequelize, DataTypes} = require("sequelize");
const path = "sqlite::memory:";
const sequelize = new Sequelize(path, {
  logging: false
});

class User extends Model {}
User.init({
  name: DataTypes.STRING,
}, {sequelize,paranoid: true});

class Task extends Model {}
Task.init({
  description: DataTypes.STRING,
}, {sequelize,paranoid: true});

User.hasMany(Task);
let mytasks1 = [
  { description: "write memo" }, { description: "check accounts" }
];

let mytasks2 = [
  { description: "make two phone calls" },
  { description: "read new emails" },
  { description: "arrange meeting" }
];

async function createTablesData() {
  await User.sync();
  await Task.sync();
  let user1 = await User.create({ name: "John Doe" });
  let tasks1 = await Task.bulkCreate(mytasks1);

  await user1.setTasks(tasks1);

  let user2 = await User.create({ name: "Debbie Griffin" });
  let tasks2 = await Task.bulkCreate(mytasks2);

  await user2.setTasks(tasks2);

}

async function showUsersTasks() {

  let users = await User.findAll({ include: [Task] });

  users.forEach(user => {

    console.log(`${user.name} has tasks: `);

    let tasks = user["Tasks"];

    tasks.forEach(task => {
      console.log(`  * ${task.description}`);
    });
  });
}

async function main() {
  await createTablesData();
  await showUsersTasks();
  console.log("done");
  await sequelize.close();
}

main();
