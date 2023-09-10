const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    idcard: String,
    birthday: Date,
    sex: Boolean,
    province: String,
    district: String,
    commune: String,
    address: String,
    room: String,
    main_contact: Boolean,
    status: String,
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    
}, { versionKey: false });

module.exports = mongoose.model("User", userSchema, 'renters');
