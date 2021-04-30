const mongoose = require("mongoose");

const server = "127.0.0.1:27017";
const database = "myDB";

class Database {
  constructor() {}

  async connect() {
    await mongoose.connect(`mongodb://${server}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async close() {
    await mongoose.disconnect();
  }
}

module.exports = new Database();
