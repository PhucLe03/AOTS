const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  group: {
    type: String,
  },
  type: {
    type: String,
  },
  price: {
    type: Number,
  },
  deposit: {
    type: Number,
  },
  debt: {
    type: Number,
  },
  renter: {
    type: Number,
  },
  day_of_hire: {
    type: Date,
  },
  expiration_date: {
    type: Date,
  },
  status: {
    type: String,
  },
  services: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
      quantity: {
        type: Number,
      },
    },
  ],
  sort: {
    type: Number,
  },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Room", roomSchema, "rooms");
