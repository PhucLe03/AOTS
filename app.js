const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
// Kết nối đến cơ sở dữ liệu
mongoose
  .connect(
    "mongodb+srv://duynguyen:0944094730@cluster0.rcac5l3.mongodb.net/Motel_AOTS",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Connection error:", error));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


//setup routes
const roomRoute = require('./routes/roomRoutes')
app.use('/api/', roomRoute);

const serviceRoute = require('./routes/serviceRoutes')
app.use('/api/', serviceRoute);