const Renter = require("../models/renter");

function getAllRenters(req, res) {
  Renter.find()
    .then((renters) => {
      res.status(200).json(renters);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function getRenterById(req, res) {
  Renter.findById(req.params.id)
    .then((renter) => {
      if (!renter) {
        return res.status(404).json({ message: "Renter not found." });
      }
      res.status(200).json(renter);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function createRenter(req, res) {
  const newRenter = new Renter(req.body);
  newRenter
    .save()
    .then((savedRenter) => {
      res.status(201).json(savedRenter);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function updateRenter(req, res) {
  Renter.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((renter) => {
      if (!renter) {
        return res.status(404).json({ message: "Renter not found." });
      }
      res.status(200).json(renter);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

function deleteRenter(req, res) {
  Renter.findByIdAndDelete(req.params.id)
    .then((renter) => {
      if (!renter) {
        return res.status(404).json({ message: "Renter not found." });
      }
      res.status(204).json();
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

module.exports = {
  getAllRenters,
  getRenterById,
  createRenter,
  updateRenter,
  deleteRenter,
};
