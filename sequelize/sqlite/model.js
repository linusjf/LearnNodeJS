#!/usr/bin/env node
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize({
  database: "mydb",
  dialect: "sqlite",
  storage: "mydb.sqlite",
  define: {
    freezeTableName: false
  }
});

async function start() {
  class User extends Model {
    getFullName() {
      return [this.firstName, this.lastName].join(" ");
    }
  }

  User.init({
  // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue: ""
    // allowNull defaults to true
    }
  }, {
  // Other model options go here
  // We need to pass the connection instance
    sequelize,
    timestamps: true,
    // We need to choose the model name
    modelName: "User",
    tableName: "Users"
  });

  const user = User.build({ firstName: "Jane", lastName: "Doe" });
  console.log(user.getFullName()); 
  console.log(User === sequelize.models.User);

  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  // This will run .sync() 
  // only if database name is 'mydb'
  await sequelize.sync({ force: true, 
    match: /mydb/ ,
    alter: true });
  console.log("Database & tables created!");


  await User.drop();
  console.log("User table dropped!");
}

start();
