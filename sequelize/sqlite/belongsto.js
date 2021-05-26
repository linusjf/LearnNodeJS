#!/usr/bin/env node
const Sequelize = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:", {
  logging: false
});

let Employee = sequelize.define("employees", {
  name: Sequelize.STRING
},{paranoid: true});
  

let Project = sequelize.define("projects", {
  name: Sequelize.STRING},{paranoid: true}
);

Employee.belongsTo(Project);

let employees = [
  { name: "Jane Brown" }, { name: "Lucia Benner" }, { name: "Peter Novak" }
];

async function start() {
  await sequelize.sync({ force: true });
  const emps = await Employee.bulkCreate(employees);
  for (let i = 0; i < emps.length; i++)  {
    let pname = "Project " + String.fromCharCode("A".charCodeAt() + i);
    let employee = emps[i];
    let project = await Project.create({ name: pname });
    await employee.setProject(project);
  }
  console.log(await Employee.findAll({raw: true}));
  console.log(await Project.findAll({raw: true}));
  await sequelize.close();
  console.log("finish");
}

start();
