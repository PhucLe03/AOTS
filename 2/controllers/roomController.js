const Room = require('../models/room')
// Get all rooms
function getAllRooms(req, res) {
    Room.find()
        .then((rooms) => {
            res.status(200).json(rooms);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Server error. Please try again.' });
        });
}

// Get room information by ID
function getRoomById(req, res) {
    Room.findById(req.params.id)
        .then((room) => {
            if (!room) {
                return res.status(404).json({ message: 'Room not found.' });
            }
            res.status(200).json(room);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Server error. Please try again.' });
        });
}    

// Create a new room
//http POST
function createRoom(req, res) {
    const newRoom = new Room(req.body);
    newRoom.save()
    .then((savedRoom) => {
    res.status(201).json(savedRoom);
    })
    .catch((error) => {
    res.status(500).json({ message: 'Server error. Please try again.' });
    });
    }

// Update a room
//PUT
function updateRoom(req, res) {
    Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((room) => {
            if (!room) {
                return res.status(404).json({ message: 'Room not found.' });
            }
            res.status(200).json(room);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Server error. Please try again.' });
        });
}

// Delete a room
//DELETE
function deleteRoom(req, res) {
    Room.findByIdAndDelete(req.params.id)
        .then((room) => {
            if (!room) {
                return res.status(404).json({ message: 'Room not found.' });
            }
            res.status(204).json();
        })
        .catch((error) => {
            res.status(500).json({ message: 'Server error. Please try again.' });
        });
}

// GET services in the room
function getServicesInRoom(req, res) {
    const roomId = req.params.roomId;
    Room.findById(roomId)
        .populate('services.serviceId')
        .then(room => {
            if (!room) {
                return res.status(404).json({ message: 'Room not found.' });
            }
            const services = room.services.map(serviceData => serviceData.serviceId);
            res.status(200).json(services);
        })
        .catch(error => {
            res.status(500).json({ message: 'Server error. Please try again.' });
        });
}
    

module.exports={
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
}