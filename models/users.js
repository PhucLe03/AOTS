const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    
});

module.exports = mongoose.model("User", userSchema, 'renters');
