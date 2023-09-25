const mongoose = require("mongoose");
const User = require("../models/users.js");

// Get all users
async function getAllUsers(req, res) {
  const users = await User.find({});
  res.send(users);
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  res.send(user);
}

async function createUser(req, res) {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  if (savedUser) {
    res.send(savedUser);
  }
}

async function updateUser(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    return res.status(404).send();
  }
  res.send(user);
}

async function deleteUser(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).send();
  }
  res.send(true);
}

// function getUserRoom(req, res) {
//   var Room = require('../models/rooms.js');
  
// }

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
