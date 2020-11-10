const express = require("express");
const morgan = require("morgan");
const applications = require("./playstoreApps");
const app = express();

app.use(morgan("common"));

app.get("/apps", (req, res) => {
  const { sort, genre } = req.query;

  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      return res.status(400).send("Sort must be one of rating or title");
    }
  }

  if (genre) {
    if (
      !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        genre
      )
    )
      return res
        .status(400)
        .send(
          "Genre must be Action, Puzzle, Strategy, Casual, Arcade, or Card"
        );
  }

  let results = genre
    ? applications.filter((app) =>
        app.Genres.toLowerCase().includes(genre.toLowerCase())
      )
    : applications;

  if (sort === "App") {
    results.sort((a, b) => {
      let appA = a.App.toLowerCase();
      let appB = b.App.toLowerCase();
      return appA > appB ? 1 : appA < appB ? -1 : 0;
    });
  }
  if (sort === "Rating") {
    results.sort((a, b) => {
      return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
    });
  }
  res.send(results);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
