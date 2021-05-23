#!/usr/bin/env node
const { Sequelize, DataTypes, Model, Op } = require("sequelize");
const sequelize = new Sequelize({
  database: "mydb",
  dialect: "sqlite",
  storage: "mydb.sqlite",
  define: {
    freezeTableName: false
  },
  logging: console.log
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
  console.log(User === sequelize.models.User);

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
  console.log(jane instanceof User); 
  await jane.save();
  console.log("Jane was saved to the database!");
  console.log(jane.toJSON()); 
  const john = await User.create({ firstName: "John",
    lastName: "Doe", dob: new Date("1974-06-29"),
    isAdmin: true});
  console.log(john instanceof User); 
  await john.save();
  console.log("John was saved to the database!");
  console.log(JSON.stringify(john, null, 2));
  const may = await User.create({ firstName: "May",
    lastName: "Poe",
    dob: new Date("1980-12-24")});
  console.log(may instanceof User); // true
  console.log(may.toJSON());
  may.firstName = "April";
  await may.save();
  console.log(may.toJSON());
  may.firstName = "June";
  console.log(may.toJSON());
  await may.reload();
  console.log(may.toJSON());
  may.firstName = "May II";
  may.favoriteColor = "blue";
  await may.save({ fields: ["fullName"] });
  console.log(may.fullName); 
  console.log(may.favoriteColor); // "blue"
  await may.reload();
  console.log(may.fullName); 
  console.log(may.favoriteColor); // "
  await may.increment({
    "cash": 100
  });
  await may.reload();
  console.log(may.toJSON());

  var users = await User.findAll();
  console.log("All users:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    attributes: ["firstName", ["lastName", "surname"], "cash"]
  });
  console.log("All users:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    attributes: [
      "firstName",
      [sequelize.fn("SUM", sequelize.col("cash")), "total_cash"],
      "isAdmin"
    ],
    group: ["firstName","isAdmin"]
  });
  console.log("All users:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    where: {
      isAdmin: false
    }
  });
  console.log("Non-admin users:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    where: {
      id: {
        [Op.in]: [1,3]
      }
    }
  });
  console.log("Selected users:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    where: {
      id: 1,
      isAdmin: false
    }
  });
  console.log("Selected users:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    where: {
      [Op.and]: [
        { firstName: "Jane",
          isAdmin: false }
      ]
    }
  });
  console.log("Selected users:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    where: {
      [Op.or]: [
        { id: 1 },
        { id: 3 }
      ]
    }
  });
  console.log("Selected users:", JSON.stringify(users, null, 2));
  User.update({ lastName: "Smith" }, {
    where: {
      lastName: null
    }
  }).catch(err => console.error(err.message));
  users = await User.findAll({ group: "isAdmin" });
  console.log("Selected group users:", JSON.stringify(users, null, 2));

  users = await User.findAll({ offset: 1,limit: 2 });
  console.log("Selected users:", JSON.stringify(users, null, 2));
  console.log(`There are ${await User.count()} users.`);

  users = await User.max("dob"); 
  console.log("max dob:", JSON.stringify(users, null, 2));
  users = await User.max("dob", { where: { dob: { [Op.lt]: new Date("1970-01-01") } } }); 
  console.log("max dob < 1970:", JSON.stringify(users, null, 2));
  users = await User.min("dob"); 
  console.log("min dob:", JSON.stringify(users, null, 2));
  console.log("max dob < 1970:", JSON.stringify(users, null, 2));
  users = await User.min("dob", { where: { dob: { [Op.gt]: new Date("1980-01-01") } } }); 
  console.log("min dob > 1980:", JSON.stringify(users, null, 2));
  
  User.sum("age").catch(err => console.error("Aggregate functions on virtual columns disallowed: " +
  err.message));

  await User.destroy({
    where: {
      id: {
        [Op.or]: [1, 2]
      }
    }
  });
  users = await User.findAll();
  console.log("Selected users:", JSON.stringify(users, null, 2));
  await may.destroy();
  users = await User.findAll();
  console.log("Selected users:", JSON.stringify(users, null, 2));
  await User.destroy({
    truncate: true,
    restartIdentity: true
  });
  console.log("User table truncated!");
  await sequelize.query("DELETE FROM `sqlite_sequence` WHERE `name` = 'Users'");
  console.log("User table identity reset!");
}

start();
