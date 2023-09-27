const mongoose = require("mongoose");

const connect = async () => {
  try {
    const uri =
      "mongodb+srv://duynguyen:0944094730@cluster0.rcac5l3.mongodb.net/Motel_AOTS";
    await mongoose.connect(uri);
    console.log("connect successfully");
  } catch (error) {
    console.log("connect failure");
    console.log(error);
  }
};

module.exports = { connect };
