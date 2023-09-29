const Room = require('../models/Room')
const Service = require('../models/Service')

class RoomController {
    // [GET] /room
    async Index(req, res) {
        try {
            const rooms = await Room.aggregate([
                {
                    $lookup: {
                        from: 'renters', // Tên của bảng Renters trong database
                        localField: '_id',
                        foreignField: 'room',
                        as: 'renters',
                    },

                },
                {
                    $lookup: {
                        from: 'services', // Tên của bảng Services trong database
                        localField: 'services',
                        foreignField: '_id',
                        as: 'services',
                    },
                },
                {
                    $addFields: {
                        numberOfRenters: { $size: '$renters' }, // Đếm số lượng renters cho mỗi phòng
                    },
                },
                {
                    $project: {
                        'renters': 0,
                        'services.unit': 0,
                        'services.price': 0,
                        'services.createdAt': 0,
                        'services.updatedAt': 0,
                        'services.__v': 0,
                    }
                }
            ])

            res.send(rooms)
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }

    // [POST] /room/store
    Store(req, res) {
        try {
            const room = new Room(req.body)
            room.save()
            res.json(room)
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }

    // [GET] /room/show/:id
    async Show(req, res) {
        try {
            const roomId = req.params.id;

            // Tìm phòng dựa trên ID
            const room = await Room.findById(roomId)
                .populate('services.serviceId');

            if (!room) {
                return res.status(404).json({ message: "Không tìm thấy phòng." });
            }

            res.json(room);
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }

    // [PUT] /room/update/:id
    async Update(req, res) {
        try {
            const _id = req.params.id;
            const room = await Room.findByIdAndUpdate(_id, req.body, { new: true });
            if (!room) {
                return res.status(404).send();
            }
            res.send(room);
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }

    // [DELETE] /room/detele/:id
    async Delete(req, res) {
        try {
            const room = await Room.findByIdAndDelete(req.params.id)
            if (!room) {
                return res.status(404).send()
            }
            res.send(true)
        } catch (err) {
            console.error(err); // Log lỗi để kiểm tra
            res.status(500).send("Lỗi trong quá trình xử lý yêu cầu.");
        }
    }
}

module.exports = new RoomController