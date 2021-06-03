const mongoose = require("mongoose");

const movie = mongoose.Schema({
    title: {
        type: String
    },
    year: {
        type: Number
    }
});

module.exports =
    mongoose.model("Movie", movie);