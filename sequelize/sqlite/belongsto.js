#!/usr/bin/env node
const { DataTypes,Sequelize, Model } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:", {
  logging: false
});

class Employee extends Model {}
Employee.init({
  name: DataTypes.STRING
},{sequelize,paranoid: true});
  
class Project extends Model {}
Project.init({
  name: DataTypes.STRING},
{
  sequelize,
  paranoid: true
});

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
