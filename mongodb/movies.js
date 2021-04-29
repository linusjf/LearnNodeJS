#!/usr/bin/env node

const mongoose = require("mongoose");
const Movie = require("./movieSchema");

async function insertRecords() {
  await mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("open");
  });

  let movie = new Movie({
    title: "The Matrix",
    year: 1999
  });
  await Movie.findOneAndDelete({title: movie.title});
  await movie.save();
  movie = new Movie({
    title: "The Shawshank Redemption",
    year: 1994
  });
  await Movie.findOneAndDelete({title: movie.title});
  await movie.save();
  movie = new Movie({
    title: "The Godfather",
    year: 1972
  });
  await Movie.findOneAndDelete({title: movie.title});
  await movie.save();

  movie = new Movie({
    title: "The Godfather - Part II",
    year: 1974
  });
  await Movie.findOneAndDelete({title: movie.title});
  await movie.save();
  movie = new Movie({
    title: "The Dark Knight",
    year: 2008
  });
  await Movie.findOneAndDelete({title: movie.title});
  await movie.save();
  movie = new Movie({
    title: "12 Angry Men",
    year: 1957
  });

  await Movie.findOneAndDelete({title: movie.title});
  await movie.save();
  movie = new Movie({
    title: "Schindlers List",
    year: 1993
  });
  await Movie.findOneAndDelete({title: movie.title});
  await movie.save();
  movie = new Movie({
    title: "Pulp Fiction",
    year: 1994
  });
  await Movie.findOneAndDelete({title: movie.title});
  await movie.save();
}

(async () => {
  try {
    await insertRecords();
  } catch (err) {
    console.log(err.message);
  } finally {
    mongoose.disconnect();
  }
})();
