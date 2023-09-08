const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
});

module.exports = mongoose.model("User", userSchema);
