const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Renter = new Schema({
    name: { type: String },
    phone: { type: String },
    id_card: { type: String },
    birth_day: { type: Date },
    sex: { type: Boolean },
    province: { type: String },
    district: { type: String },
    commune: { type: String },
    address: { type: String },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    main_contact: { type: Boolean },
    status: { type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model('Renter', Renter)