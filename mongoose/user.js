const mongoose = require("mongoose");
const timestampPlugin = require("./timestamp");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  createdAt: Date,
  updatedAt: Date
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

userSchema.pre("save", function (next) {
  let now = Date.now();
   
  this.updatedAt = now;
  // Set a value for createdAt only if it is null
  if (!this.createdAt) 
    this.createdAt = now;
  
  // Call the next function in the pre-save chain
  next();
});

userSchema.plugin(timestampPlugin);

module.exports = mongoose.model("User", userSchema);
