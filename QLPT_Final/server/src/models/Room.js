const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Room = new Schema({
    name: { type: String },
    group: { type: String },            // phòng nằm ở tầng 1 hoặc tầng 2, tầng 3, ...
    type: { type: String },             // trạng thái hiện tại của phòng (đang trống, đã có người thuê, sắp trả phòng, ...)
    price: { type: Number },            // giá phòng
    deposit: { type: Number },          // tiền cọc
    debt: { type: Number },             // tiền khách trọ còn nợ khi thuê phòng (ví dụ khách chỉ mới thanh toán 50% tiền cọc, còn nợ 50%)
    day_of_hire: { type: Date },        // ngày thuê
    expiration_date: { type: Date },    // ngày hết hạn hợp đồng
    description: { type: String },      // mô tả (ví dụ: khách còn nợ tiền dịch vụ, còn nợ tiền cọc, ...)
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
    },]
}, {
    timestamps: true
})

module.exports = mongoose.model('Room', Room)