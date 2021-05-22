#!/usr/bin/env node
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory", {
  define: {
    freezeTableName: false
  }
});

const User = sequelize.define("User", {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  tableName: "Users"
});

// `sequelize.define` also returns the model
// true
console.log(User === sequelize.models.User); 
