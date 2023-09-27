const Room = require('../models/Room')

class RoomController {
    // [GET] /room
    async Index(req, res) {
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
                    localField: 'services.serviceId',
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
    }

    // [POST] /room/store
    Store(req, res) {
        const room = new Room(req.body)
        room.save()
        res.json(room)
    }

    // [GET] /room/show/:id
    Show(req, res) {
        // 
    }

    // [PUT] /room/update/:id
    async Update(req, res) {
        const _id = req.params.id;
        const room = await Room.findByIdAndUpdate(_id, req.body, { new: true });
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    }

    // [DELETE] /room/detele/:id
    async Delete(req, res) {
        const room = await Room.findByIdAndDelete(req.params.id)
        if (!room) {
            return res.status(404).send()
        }
        res.send(true)
    }
}

module.exports = new RoomController