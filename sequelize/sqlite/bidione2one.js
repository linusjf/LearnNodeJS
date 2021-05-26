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
Project.hasOne(Employee);

let employees = [
  { name: "Jane Brown" }, { name: "Lucia Benner" }, { name: "Peter Novak" }
];

async function start() {
  await sequelize.sync({ force: true });
  var emps = await Employee.bulkCreate(employees);
  for (let i = 0; i < emps.length; i++)  {
    let pname = "Project " + String.fromCharCode("A".charCodeAt() + i);
    let employee = emps[i];
    let project = await Project.create({ name: pname });
    await employee.setProject(project);
  }
  emps = await Employee.findAll({raw: true,
    include: {
      model: Project,
    },
  });
  emps.forEach(employee => {
    console.log(`${employee.name} is in ${employee["Project.name"]}`);
  });
  const projects = await Project.findAll({include: [Employee],
    raw: true});
  projects.forEach(project => {
    console.log(`${project.name} belongs to user ${project["Employee.name"]}`);
  });
  await sequelize.close();
  console.log("finish");
}

start();
