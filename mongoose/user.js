const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

userSchema.virtual("fullName").get(function() {
  return this.firstName + " " + this.lastName;
});

userSchema.virtual("fullName").set(function(name) {
  const str = name.split(" ");

  this.firstName = str[0];
  this.lastName = str[1];
});

userSchema.methods.getInitials = function() {
  return this.firstName[0] + this.lastName[0];
};

userSchema.statics.getUsers = function() {
  return new Promise((resolve, reject) => {
    this.find((err, docs) => {
      if(err) {
        console.error(err.message);
        return reject(err);
      }
      resolve(docs);
    });
  });
};

module.exports = mongoose.model("User", userSchema);
