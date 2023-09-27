const Room = require("../models/rooms.js");

async function getAllRooms(req, res) {
  const rooms = await Room.find({});
  res.send(rooms);
}

async function getRoomById(req, res) {
  const room = await Room.findById(req.params.id);
  if (!room) {
    return res.status(404).json({ message: "Room not found." });
  }
  res.send(room);
}

async function createRoom(req, res) {
  const newRoom = new Room(req.body);
  const savedRoom = await newRoom.save();
  if (savedRoom) {
    res.send(savedRoom);
  }
}

async function updateRoom(req, res) {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!room) {
    return res.status(404).send();
  }
  res.send(room);
}

async function deleteRoom(req, res) {
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) {
    return res.status(404).send();
  }
  res.send(true);
}

function getServicesInRoom(req, res) {
  const roomId = req.params.roomId;
  Room.findById(roomId)
    .populate("services.serviceId")
    .then((room) => {
      if (!room) {
        return res.status(404).json({ message: "Room not found." });
      }
      const services = room.services.map(
        (serviceData) => serviceData.serviceId
      );
      res.send(services);
      // res.status(200).json(services);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getServicesInRoom,
};
