const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Service = new Schema({
    name: { type: String },
    unit: { type: String },
    price: { type: Number }
}, {
    timestamps: true
})

module.exports = mongoose.model('Service', Service)