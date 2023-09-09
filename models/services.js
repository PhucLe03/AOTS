const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema({
  name: String,
  unit: String,
  price: Number,
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
}, { versionKey: false });

module.exports = mongoose.model("Service", serviceSchema, "services");
