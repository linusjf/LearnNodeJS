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

class User extends Model {
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
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      var arr = value.split(" ");
      if (arr.length == 1)
        this.firstName = arr.pop();
      else {
        this.lastName = arr.pop();
        this.firstName = arr.join(" ");
      }
    }
  },
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: "green"
  },
  dob: DataTypes.DATE,
  age:{ 
    type: DataTypes.VIRTUAL,
    get() {
      var diff_ms = Date.now() - this.dob.getTime();
      var age_dt = new Date(diff_ms); 
      return Math.abs(age_dt.getUTCFullYear() - 1970);
    },
  },
  cash: DataTypes.INTEGER
}, {
  // Other model options go here
  // We need to pass the connection instance
  sequelize,
  timestamps: true,
  // We need to choose the model name
  modelName: "User",
  tableName: "Users"
});

async function start() {
  const user = User.build({ firstName: "Jane", lastName: "Doe" ,
    dob: new Date("1969-12-23")});
  console.log(user.get()); 
  console.log(User === sequelize.models.User);

  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  // This will run .sync() 
  // only if database name is 'mydb'
  await sequelize.sync({ force: false, 
    match: /mydb/ ,
    alter: false});
  console.log("Database & tables created!");

  await User.drop();
  console.log("User table dropped!");
}

start();
