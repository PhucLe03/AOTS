const mongoose = require("mongoose");
const User = require("../models/users.js");

// Get all users
function getAllUsers(req, res) {
  User.find()
    // .select("_id name phone idcard status")
    .then((allUsers) => {
      return res.status(200).json({
        success: true,
        message: "A list of all users",
        User: allUsers,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

function getUserById(req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function createUser(req, res) {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((savedUser) => {
      res.status(201).json(savedUser);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function updateUser(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function deleteUser(req, res) {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.status(204).json();
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
