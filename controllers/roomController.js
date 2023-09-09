const Room = require("../models/rooms.js");

function getAllRooms(req, res) {
  Room.find()
    // .select('_id name group type')
    .then((rooms) => {
      res.status(200).json(rooms);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function getRoomById(req, res) {
  Room.findById(req.params.id)
    .then((room) => {
      if (!room) {
        return res.status(404).json({ message: "Room not found." });
      }
      res.status(200).json(room);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function createRoom(req, res) {
  const newRoom = new Room(req.body);
  newRoom
    .save()
    .then((savedRoom) => {
      res.status(201).json(savedRoom);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function updateRoom(req, res) {
  Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((room) => {
      if (!room) {
        return res.status(404).json({ message: "Room not found." });
      }
      res.status(200).json(room);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function deleteRoom(req, res) {
  Room.findByIdAndDelete(req.params.id)
    .then((room) => {
      if (!room) {
        return res.status(404).json({ message: "Room not found." });
      }
      res.status(204).json();
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
};
