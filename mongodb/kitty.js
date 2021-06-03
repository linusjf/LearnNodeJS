#!/usr/bin/env node

const mongoose = require("mongoose");

async function main() {

    await mongoose.connect("mongodb://localhost/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    let db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
        console.log("open");
    });

    const kittySchema = new mongoose.Schema({
        name: String
    });

    kittySchema.methods.speak = function() {
        const greeting = this.name ?
            "Meow name is " + this.name :
            "I do not have a name";
        console.log(greeting);
    };

    const Kitten = mongoose.model("Kitten", kittySchema);
    const silence = new Kitten({
        name: "Silence"
    });
    console.log(silence.name);

    const fluffy = new Kitten({
        name: "fluffy"
    });
    fluffy.speak();

    await silence.save(function(err, silence) {
        if (err) return console.error(err);
        silence.speak();
    });

    await fluffy.save(function(err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
    });

    await Kitten.find(function(err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
    });
}


(async () => {
    try {
        await main();
    } catch (e) {
        console.log(e.message);
    } finally {
        mongoose.disconnect();
    }
})();