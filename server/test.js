const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cors());

require("dotenv").config();
const port = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("sample.ejs");
});

const connectionString = process.env.DBSTRING || "mongodb://localhost:27017/DatabaseName"

mongoose
  .connect(connectionString,
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

const userRoute = require("./routes/userRoute.js")
app.use("/api/", userRoute)
const roomRoute = require("./routes/roomRoute.js")
app.use("/api/", roomRoute)
const serviceRoute = require("./routes/serviceRoute.js")
app.use("/api/", serviceRoute)