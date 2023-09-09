const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String
    },
    idcard: {
        type: String
    },
    status: {
        type: String
    },
    
}, { versionKey: false });

module.exports = mongoose.model("User", userSchema, 'renters');
