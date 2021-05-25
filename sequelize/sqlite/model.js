#!/usr/bin/env node
const hash = require("object-hash");
const { Sequelize, DataTypes, Model, Op, QueryTypes } = require("sequelize");
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
      len: [1, 20],
      isAlpha: true
    }
  },
  lastName: {
    type: DataTypes.STRING,
    defaultValue: "",
    validate: {
      len: [1, 30],
      isAlpha: true
    }
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      if (value) {
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
    }
  },
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: "green"
  },
  dob: {
    type:DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true
    }
  },
  age:{ 
    type: DataTypes.VIRTUAL,
    get() {
      if (this.dob) {
        var diff_ms = Date.now() - this.dob.getTime();
        var age_dt = new Date(diff_ms); 
        return Math.abs(age_dt.getUTCFullYear() - 1970);
      }
    },
  },
  cash:{
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  isAdmin:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(64),
    is: /^[0-9a-f]{64}$/i,
    set(value) {
      this.setDataValue("password", hash(this.username + value, "SHA-512"));
    }
  }
}, {
  sequelize,
  timestamps: true,
  modelName: "User",
  tableName: "Users",
  paranoid: true
});

async function authenticate() {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
}

async function sync() {
  // This will run .sync() 
  // only if database name is 'mydb'
  await sequelize.sync({ force: false, 
    match: /mydb/ ,
    alter: false});
  console.log("Database & tables created!");
}

async function addRecs() {
  const jane = User.build({ firstName: "Jane", lastName: "Doe" ,
    dob: new Date("1969-12-23"),
    username: "janedoe", password: "janet123"});
  await jane.save();
  console.log("Jane was saved to the database!");
  console.log(jane.toJSON()); 
  const john = await User.create({ firstName: "John",
    lastName: "Doe", dob: new Date("1974-06-29"),
    isAdmin: true,
    username: "johndoe", password: "johnd123"});
  await john.save();
  console.log("John was saved to the database!");
  console.log(JSON.stringify(john, null, 2));
  const may = await User.create({ firstName: "May",
    lastName: "Poe",
    dob: new Date("1980-12-24"),
    username: "maypoe", password: "may123"});
  console.log(may.toJSON());
  may.firstName = "April";
  await may.save();
  console.log("May was saved to the database!");
  console.log(may.toJSON());
  may.firstName = "June";
  console.log("Name updated to June!");
  console.log(may.toJSON());
  await may.reload();
  console.log("Reload May from database!");
  console.log(may.toJSON());
  may.firstName = "May II";
  may.favoriteColor = "blue";
  console.log("May updated in memory!");
  console.log(may.toJSON());
  await may.save({ fields: ["fullName"] });
  console.log("May full name saved to database!");
  console.log(may.fullName); 
  console.log(may.favoriteColor);
  await may.reload();
  console.log("Reload May from database!");
  console.log(may.fullName); 
  console.log(may.favoriteColor); // "
  await may.increment({
    "cash": 100
  });
  console.log("May cash incremented by 100!");
  await may.reload();
  console.log("Reload May from database!");
  console.log(may.toJSON());
}

async function findAll() {
  var users = await User.findAll();
  console.log("All users:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    attributes: ["firstName", ["lastName", "surname"], "cash"]
  });
  console.log("All users first and last names and cash:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    attributes: [
      "firstName",
      [sequelize.fn("SUM", sequelize.col("cash")), "total_cash"],
      "isAdmin"
    ],
    group: ["firstName","isAdmin"]
  });
  console.log("All users with first name, sum cash and isAdmin:", JSON.stringify(users, null, 2));
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
  console.log("Selected users with id 1 and 3:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    where: {
      id: 1,
      isAdmin: false
    }
  });
  console.log("Selected users with id 1 and non-admin:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    where: {
      [Op.and]: [
        { firstName: "Jane",
          isAdmin: false }
      ]
    }
  });
  console.log("Selected users with first name Jane and non-admin:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    where: {
      [Op.or]: [
        { id: 1 },
        { id: 3 }
      ]
    }
  });
  console.log("Selected users with id 1 or 3:", JSON.stringify(users, null, 2));
}

async function update() {
  User.update({ lastName: "Smith" }, {
    where: {
      lastName: "Doe"
    }
  });
  User.update({ lastName: "Smith" }, {
    where: {
    }
  });
  console.log(`There are ${await User.count()} users.`);
}

async function aggregates() { 
  var users = await User.max("dob"); 
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
}

async function bulkCreate() {
  console.log("Bulk create....");
  await User.bulkCreate([
    {firstName: "Sue", lastName: "Brown", dob: new Date("1960-12-12"),
      favoriteColor: "blue",
      username: "suebrown", password: "brown123"},
    {firstName: "Joe", lastName: "Baker", dob: 
      new Date("1940-05-09"), isAdmin: true,
    favoriteColor: "yellow",
    username: "joebaker", password: "baker123"}]);
  var users = await User.findAll({raw: true});
  console.log("Selected users post bulk create:", JSON.stringify(users, null, 2));
}

async function order() {
  var users = await User.findAll({
    order: [
      ["lastName", "DESC"],
    ],
    raw:true
  });
  console.log("Selected users by lastName DESC:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    order: sequelize.random(),
    raw:true
  });
  console.log("Selected users by random:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    attributes: [
      "favoriteColor",
      [sequelize.fn("COUNT", sequelize.col("favoriteColor")), "count"],
    ],
    group: ["favoriteColor"],
    order: sequelize.fn("count", sequelize.col("favoriteColor")),
    raw: true
  });
  console.log("Selected users by count favoriteColor:", JSON.stringify(users, null, 2));
  users = await User.findAll({
    order: sequelize.col("age"),
    raw: true
  }).catch(err => console.error(err.message));
}

async function destroyRecs() {
  await User.destroy({
    where: {
      id: {
        [Op.or]: [1, 2, 3]
      }
    }
  });
  var users = await User.findAll();
  console.log("Selected users:", JSON.stringify(users, null, 2));
}

async function finders() {
  console.log("Find by PK");
  var user = await User.findByPk(1, { raw: true});
  if (user === null) {
    console.log("Not found!");
  } else {
    console.log(user); 
  }
  user = await User.findOne({ where: { lastName: "Doe" },
    raw: true});
  if (user === null) {
    console.log("Not found!");
  } else {
    console.log(user.fullName); 
  }
  var [rec, created] = await User.findOrCreate({
    where: { firstName: "Leopold" },
    defaults: {
      lastName: "Polinsky",
      dob: new Date("1956-03-03"),
      username: "leopoldp",
      password: "polinsky123"
    }
  });
  console.log(rec.fullName); 
  console.log(rec.isAdmin); 
  console.log(created); 
  if (created) 
    console.log(rec.lastName);
  const { count, rows } = await User.findAndCountAll({
    where: {
      lastName: {
        [Op.like]: "Sm%"
      }
    },
    raw: true,
    offset: 1,
    limit: 2,
  });
  console.log(count);
  console.log(rows);
}

async function queries() {
  const [results, metadata] = await sequelize.query("UPDATE users SET cash = 200 WHERE cash = 0");
  console.log("results = " + results);
  console.log("metadata = ");
  console.log(metadata);
  var users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
  console.log("Select * users:", JSON.stringify(users, null, 2));
  users = await sequelize.query("SELECT * FROM users", {
    model: User,
    mapToModel: true,
    raw: true
  });
  console.log("Select * from users as model:", users);
  await sequelize.query("SELECT 1", {
    logging: console.log,
    plain: false,
    raw: false,
    type: QueryTypes.SELECT
  });

  console.log(await sequelize.query("SELECT * FROM users", { raw: true }));
  var records = await sequelize.query("select 1 as `foo.bar.baz`", {
    type: QueryTypes.SELECT
  });
  console.log(JSON.stringify(records[0], null, 2));
  records = await sequelize.query("select 1 as `foo.bar.baz`", {
    nest: true,
    type: QueryTypes.SELECT
  });
  console.log(JSON.stringify(records[0], null, 2));
  console.log(await sequelize.query(
    "SELECT * FROM users WHERE isAdmin = ?",
    {
      replacements: [true],
      type: QueryTypes.SELECT
    }
  ));

  console.log(await sequelize.query(
    "SELECT * FROM users WHERE isAdmin = :status",
    {
      replacements: { status: true },
      type: QueryTypes.SELECT
    }
  ));
  console.log(await sequelize.query(
    "SELECT * FROM users WHERE lastName IN(:name)",
    {
      replacements: { name: ["Smith", "Baker"] },
      type: QueryTypes.SELECT
    }
  ));
  console.log(await sequelize.query(
    "SELECT * FROM users WHERE lastName LIKE :search_name",
    {
      replacements: { search_name: "sm%" },
      type: QueryTypes.SELECT
    }
  ));
  console.log(await sequelize.query(
    "SELECT *, \"text with literal $$1 and literal $$status\" as t FROM users WHERE isAdmin = $1",
    {
      bind: [true],
      type: QueryTypes.SELECT
    }
  ));

  console.log(await sequelize.query(
    "SELECT *, \"text with literal $$1 and literal $$status\" as t FROM users WHERE isAdmin = $status",
    {
      bind: { status: true },
      type: QueryTypes.SELECT
    }
  ));
}

async function truncate() {
  const count = await User.destroy({
    truncate: true,
    restartIdentity: true,
    logging: console.log,
    force: true
  });
  console.log("User table truncated with " + count + " records!");
  await sequelize.query("DELETE FROM sqlite_sequence WHERE name = 'Users'");
  console.log("User table identity reset!");
}

async function start() {
  try {
    await authenticate();
    await sync();
    await addRecs();
    await findAll();
    await update();
    await aggregates();
    await bulkCreate();
    await finders();
    await order();
    await queries();
    await destroyRecs();
  } finally {
    await truncate();
  }
}

start();
