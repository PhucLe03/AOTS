const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  name: String,
  group: String,
  type: {
    type: String,
  },
  price: Number,
  deposit: Number,
  debt: Number,
  renter: Number,
  day_of_hire: Date,
  expiration_date: Date,
  status: String,
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
  sort: Number,
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
}, { versionKey: false });

module.exports = mongoose.model("Room", roomSchema, "rooms");
