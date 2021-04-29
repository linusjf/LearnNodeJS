const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const movie = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  year: Number
});

movie.plugin(uniqueValidator);
module.exports =
  mongoose.model("Movie", movie);
