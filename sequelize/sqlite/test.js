#!/usr/bin/env node
const { Sequelize, DataTypes, Model, Op } = require("sequelize");
const sequelize = new Sequelize({
  database: "mydb",
  dialect: "sqlite",
  storage: "mydb.sqlite",
  define: {
    freezeTableName: false
  },
  logging: false
});

class User extends Model {
}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 20]
    }
  },
  lastName: {
    type: DataTypes.STRING,
    defaultValue: "",
    validate: {
      len: [1, 30]
    }
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      var arr = value.split(" ");
      if (arr.length == 1) {
        this.firstName = arr.pop();
        this.lastName = "";
      }
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
  cash:{
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isAdmin:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  timestamps: true,
  modelName: "User",
  tableName: "Users"
});

async function start() {

  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  // This will run .sync() 
  // only if database name is 'mydb'
  await sequelize.sync({ force: false, 
    match: /mydb/ ,
    alter: false});
  console.log("Database & tables created!");

  const jane = User.build({ firstName: "Jane", lastName: "Doe" ,
    dob: new Date("1969-12-23")});
  await jane.save();
  console.log("Jane was saved to the database!");
  console.log(jane.toJSON()); 
  const john = await User.create({ firstName: "John",
    lastName: "Doe", dob: new Date("1974-06-29"),
    isAdmin: true});
  await john.save();
  console.log("John was saved to the database!");
  console.log(JSON.stringify(john, null, 2));
  const may = await User.create({ firstName: "May",
    lastName: "Poe",
    dob: new Date("1980-12-24")});
  console.log(may.toJSON());
  await may.save();
  console.log(may.toJSON());
  User.update({ lastName: "Smith" }, {
    where: {
      lastName: "Doe"
    }
  }).catch(err => console.error(err.message));
  User.update({ lastName: "Smith" }, {
    where: {
      lastName: {
        [Op.in]: ["Doe"]
      }
    }
  }).then(_res => console.log("Updated.")).catch(err => console.error(err.message));
  User.update({ lastName: "Smith" }, {
    where: {
    }
  }).then(_res => console.log("Updated.")).catch(err => console.error(err.message));
  User.update({ lastName: "Smith" }, {
    where: {
      lastName: {
        [Op.eq]: ["Doe"]
      }
    }
  }).then(_res => console.log("Updated.")).catch(err => console.error(err.message));

  await User.destroy({
    truncate: true,
    restartIdentity: true
  });
  console.log("User table truncated!");
  await sequelize.query("DELETE FROM `sqlite_sequence` WHERE `name` = 'Users'");
  console.log("User table identity reset!");
}

start();
