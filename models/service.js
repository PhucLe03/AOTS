const { default: mongoose } = require("mongoose");
// Định nghĩa schema và model cho collection 'rooms'
const serviceSchema = new mongoose.Schema({
  name: String,
  unit: String,
  price: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Service = mongoose.model("service", serviceSchema);
module.exports = Service;
