const mongoose = require("mongoose");
const validator = require("validator");
const timestampPlugin = require("./timestamp");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    }
  }
});

emailSchema.plugin(timestampPlugin);

module.exports = mongoose.model("Email", emailSchema);
