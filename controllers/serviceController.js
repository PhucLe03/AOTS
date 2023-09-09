const Service = require("../models/service");

// Get all services
function getAllServices(req, res) {
  Service.find()
    .then((services) => {
      res.status(200).json(services);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

// Get service information by ID
function getServiceById(req, res) {
  Service.findById(req.params.id)
    .then((service) => {
      if (!service.id) {
        return res.status(404).json({ message: "Service not found." });
      }
      res.status(200).json(service);
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error. Please try again." });
    });
}

module.exports = { getAllServices, getServiceById };
