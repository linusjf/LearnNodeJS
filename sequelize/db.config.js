module.exports = {
  HOST: "localhost",
  USER: "adminmdb",
  PASSWORD: "mariadb",
  DB: "demo",
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
