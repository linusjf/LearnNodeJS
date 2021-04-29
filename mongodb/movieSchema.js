const mongoose = require("mongoose");

const movie = mongoose.Schema({
  title: String,
  year: Number
});

//movie.plugin(uniqueValidator);
module.exports =
  mongoose.model("Movie", movie);
