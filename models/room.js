// Định nghĩa schema và model cho collection 'rooms'
const roomSchema = new mongoose.Schema({
    name: String,           // ten
    group: String,          // tang
    type: String,           // phong da thue
    price: Number,          // gia phong
    deposit: Number,        // tien coc
    debt: Number,           // tien con no
    renter: Number,         // so luong nguoi dang co trong phong
    day_of_hire: Date,      // ngay thue
    expiration_date: Date,  // ngay het han
    status: String,         // trang thai cua phong
    services: [{
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
        },
        quantity: Number,
    }],
    sort: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Room = mongoose.module('Room', roomSchema)
module.exports = Room