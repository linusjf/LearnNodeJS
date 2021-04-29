const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => {
  console.log(err.message);
  process.exit(1);
});
const movie = mongoose.Schema({
  title: String,
  year: Number
});
module.exports =
  mongoose.model("Movie", movie);
