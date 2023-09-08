// console.log("Hello")
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");

const userRoute = require("./routes/userRoute.js");
app.use("/api/", userRoute);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

require("dotenv").config();
const port = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("sample.ejs");
});

mongoose
  .connect(process.env.DBSTRING,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`URL: http://localhost:${port}`);
});
