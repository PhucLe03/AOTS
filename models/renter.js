const { default: mongoose } = require("mongoose");

// Định nghĩa schema và model cho collection
const renterSchema = new mongoose.Schema({
  name: String,
  phone: String,
  identification_card: String,
  birth_day: Date,
  sex: Boolean,
  province: String,
  district: String,
  commute: String,
  address: String,
  room: String,
  main_contact: Boolean,
  status: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Renter = mongoose.model("renters", renterSchema);
module.exports = Renter;
