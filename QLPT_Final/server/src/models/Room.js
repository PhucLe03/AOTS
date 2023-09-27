const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Room = new Schema({
    name: { type: String },
    group: { type: String },
    type: { type: String },
    price: { type: Number },
    deposit: { type: Number },
    debt: { type: Number },
    day_of_hire: { type: Date },
    expiration_date: { type: Date },
    description: { type: String },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Room', Room)